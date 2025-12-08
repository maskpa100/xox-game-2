'use client'

import { useState, useEffect } from 'react'
import styles from './TicTacToeGame.module.css'
import { Theme, themes } from '@/lib/themes'

type CellValue = 'X' | 'O' | null
type GameStatus = 'playing' | 'playerWon' | 'computerWon' | 'draw'

export default function TicTacToeGame() {
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null))
  const [isPlayerTurn, setIsPlayerTurn] = useState(true)
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing')
  const [promoCode, setPromoCode] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<'win' | 'lose' | 'draw' | null>(null)
  const [theme, setTheme] = useState<Theme>('pink')
  const [showThemeSelector, setShowThemeSelector] = useState(false)

  // Загрузка темы из localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('game-theme') as Theme
    if (savedTheme && themes[savedTheme]) {
      setTheme(savedTheme)
    }
  }, [])

  // Применение темы
  useEffect(() => {
    const currentTheme = themes[theme]
    const root = document.documentElement

    root.style.setProperty('--theme-bg', currentTheme.background)
    root.style.setProperty('--theme-bg-size', currentTheme.backgroundSize)
    root.style.setProperty('--theme-bg-before', currentTheme.backgroundBefore)
    root.style.setProperty('--theme-card-bg', currentTheme.cardBackground)
    root.style.setProperty('--theme-card-border', currentTheme.cardBorder)
    root.style.setProperty('--theme-card-shadow', currentTheme.cardShadow)
    root.style.setProperty('--theme-title-gradient', currentTheme.titleGradient)
    root.style.setProperty('--theme-button-gradient', currentTheme.buttonGradient)
    root.style.setProperty('--theme-button-color', currentTheme.buttonColor)
    root.style.setProperty('--theme-button-border', currentTheme.buttonBorder)
    root.style.setProperty('--theme-cell-bg', currentTheme.cellBackground)
    root.style.setProperty('--theme-cell-border', currentTheme.cellBorder)
    root.style.setProperty('--theme-cell-hover', currentTheme.cellHover)
    root.style.setProperty('--theme-x-color', currentTheme.xColor)
    root.style.setProperty('--theme-o-color', currentTheme.oColor)
    root.style.setProperty('--theme-modal-win-bg', currentTheme.modalWinBackground)
    root.style.setProperty('--theme-modal-win-border', currentTheme.modalWinBorder)
    root.style.setProperty('--theme-modal-lose-bg', currentTheme.modalLoseBackground)
    root.style.setProperty('--theme-modal-lose-border', currentTheme.modalLoseBorder)
    root.style.setProperty('--theme-modal-draw-bg', currentTheme.modalDrawBackground)
    root.style.setProperty('--theme-modal-draw-border', currentTheme.modalDrawBorder)
    root.style.setProperty('--theme-promo-color', currentTheme.promoCodeColor)
    root.style.setProperty('--theme-promo-border', currentTheme.promoCodeBorder)
  }, [theme])

  // Смена темы
  const changeTheme = (newTheme: Theme) => {
    setTheme(newTheme)
    localStorage.setItem('game-theme', newTheme)
    setShowThemeSelector(false)
  }

  // Генерация случайного 5-значного промокода
  const generatePromoCode = (): string => {
    return Math.floor(10000 + Math.random() * 90000).toString()
  }

  // Проверка победителя
  const checkWinner = (cells: CellValue[]): CellValue => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // горизонтали
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // вертикали
      [0, 4, 8], [2, 4, 6] // диагонали
    ]

    for (const [a, b, c] of lines) {
      if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
        return cells[a]
      }
    }
    return null
  }

  // Проверка ничьей
  const checkDraw = (cells: CellValue[]): boolean => {
    return cells.every(cell => cell !== null)
  }

  // Минимакс алгоритм для AI (упрощенная версия)
  const getBestMove = (cells: CellValue[]): number => {
    // Сначала проверяем, может ли компьютер выиграть
    for (let i = 0; i < 9; i++) {
      if (cells[i] === null) {
        const newCells = [...cells]
        newCells[i] = 'O'
        if (checkWinner(newCells) === 'O') {
          return i
        }
      }
    }

    // Затем проверяем, нужно ли блокировать игрока
    for (let i = 0; i < 9; i++) {
      if (cells[i] === null) {
        const newCells = [...cells]
        newCells[i] = 'X'
        if (checkWinner(newCells) === 'X') {
          return i
        }
      }
    }

    // Если центр свободен, занимаем его
    if (cells[4] === null) {
      return 4
    }

    // Иначе выбираем случайную свободную клетку
    const availableMoves = cells
      .map((cell, index) => (cell === null ? index : null))
      .filter((index): index is number => index !== null)

    return availableMoves[Math.floor(Math.random() * availableMoves.length)]
  }

  // Отправка сообщения в Telegram
  const sendTelegramMessage = async (message: string) => {
    try {
      setIsLoading(true)
      const response = await fetch('/api/telegram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      })

      if (!response.ok) {
        console.error('Ошибка отправки сообщения в Telegram')
      }
    } catch (error) {
      console.error('Ошибка при отправке сообщения:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Обработка хода игрока
  const handleCellClick = async (index: number) => {
    if (board[index] !== null || gameStatus !== 'playing' || !isPlayerTurn) {
      return
    }

    const newBoard = [...board]
    newBoard[index] = 'X'
    setBoard(newBoard)
    setIsPlayerTurn(false)

    // Проверка победы игрока
    const winner = checkWinner(newBoard)
    if (winner === 'X') {
      const code = generatePromoCode()
      setPromoCode(code)
      setGameStatus('playerWon')
      setModalType('win')
      setIsModalOpen(true)
      await sendTelegramMessage(`Победа! Промокод выдан: ${code}`)
      return
    }

    // Проверка ничьей
    if (checkDraw(newBoard)) {
      setGameStatus('draw')
      setModalType('draw')
      setIsModalOpen(true)
      return
    }

    // Ход компьютера
    setTimeout(() => {
      const computerMove = getBestMove(newBoard)
      const updatedBoard = [...newBoard]
      updatedBoard[computerMove] = 'O'
      setBoard(updatedBoard)

      // Проверка победы компьютера
      const computerWinner = checkWinner(updatedBoard)
      if (computerWinner === 'O') {
        setGameStatus('computerWon')
        setModalType('lose')
        setIsModalOpen(true)
        sendTelegramMessage('Проигрыш')
        return
      }

      // Проверка ничьей
      if (checkDraw(updatedBoard)) {
        setGameStatus('draw')
        setModalType('draw')
        setIsModalOpen(true)
        return
      }

      setIsPlayerTurn(true)
    }, 500)
  }

  // Сброс игры
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setIsPlayerTurn(true)
    setGameStatus('playing')
    setPromoCode(null)
    setIsModalOpen(false)
    setModalType(null)
  }

  // Закрытие модального окна
  const closeModal = () => {
    setIsModalOpen(false)
    setModalType(null)
  }

  // Закрытие селектора темы при клике вне его
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (showThemeSelector && !target.closest(`.${styles.themeSelectorContainer}`)) {
        setShowThemeSelector(false)
      }
    }

    if (showThemeSelector) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showThemeSelector])

  return (
    <div className={styles.container}>
      <div className={styles.gameCard}>
        <div className={styles.headerRow}>
          <h1 className={styles.title}>✨ Крестики-нолики ✨</h1>
          <div className={styles.themeSelectorContainer}>

            {showThemeSelector && (
              <div className={styles.themeSelector}>
                {(Object.keys(themes) as Theme[]).map((themeKey) => (
                  <button
                    key={themeKey}
                    onClick={() => changeTheme(themeKey)}
                    className={`${styles.themeOption} ${theme === themeKey ? styles.active : ''}`}
                    title={themes[themeKey].name}
                  >
                    {themes[themeKey].emoji}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.buttonS}>
          <button onClick={resetGame} className={styles.resetButton}>
            🔄 Начать заново
          </button>
          <button
            onClick={() => setShowThemeSelector(!showThemeSelector)}
            className={styles.themeButton}
            title="Сменить тему"
          >
            {themes[theme].emoji}
          </button>
        </div>
        {gameStatus === 'playing' && (
          <p className={styles.turnIndicator}>
            {isPlayerTurn ? '🎯 Ваш ход!' : '🤔 Компьютер думает...'}
          </p>
        )}



        <div className={styles.board}>
          {board.map((cell, index) => (
            <button
              key={index}
              className={`${styles.cell} ${!isPlayerTurn || gameStatus !== 'playing' ? styles.disabled : ''
                }`}
              onClick={() => handleCellClick(index)}
              disabled={cell !== null || !isPlayerTurn || gameStatus !== 'playing'}
            >
              {cell === 'X' && <span className={styles.x}>❌</span>}
              {cell === 'O' && <span className={styles.o}>⭕</span>}
            </button>
          ))}
        </div>

        {isLoading && (
          <p className={styles.loading}>Отправка сообщения...</p>
        )}
      </div>

      {/* Модальное окно с промокодом при победе */}
      {isModalOpen && modalType === 'win' && promoCode && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              ✕
            </button>
            <div className={styles.modalBody}>
              <h2 className={styles.modalTitle}>🎁 Ваш промокод на скидку!</h2>
              <p className={styles.modalSubtitle}>Скопируйте и используйте при оформлении заказа</p>
              <div className={styles.modalPromoCode}>{promoCode}</div>
              <button
                className={styles.copyButton}
                onClick={() => {
                  navigator.clipboard.writeText(promoCode)
                  alert('Промокод скопирован!')
                }}
              >
                📋 Скопировать промокод
              </button>
              <button className={styles.modalCloseButton} onClick={closeModal}>
                Закрыть
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно при проигрыше */}
      {isModalOpen && modalType === 'lose' && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContentLose} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              ✕
            </button>
            <div className={styles.modalBody}>
              <h2 className={styles.modalTitleLose}>😔 К сожалению, вы проиграли</h2>
              <p className={styles.modalSubtitleLose}>Не расстраивайтесь, попробуйте ещё раз!</p>
              <button className={styles.modalPlayAgainButton} onClick={resetGame}>
                🎮 Сыграть ещё раз
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно при ничьей */}
      {isModalOpen && modalType === 'draw' && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContentDraw} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseDraw} onClick={closeModal}>
              ✕
            </button>
            <div className={styles.modalBody}>
              <h2 className={styles.modalTitleDraw}>🤝 Ничья!</h2>
              <p className={styles.modalSubtitleDraw}>Отличная игра! Попробуйте ещё раз!</p>
              <button className={styles.modalPlayAgainButton} onClick={resetGame}>
                🎮 Сыграть ещё раз
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

