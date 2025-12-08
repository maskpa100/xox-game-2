export type Theme = 'pink' | 'lavender' | 'peach' | 'dark'

export interface ThemeColors {
  name: string
  emoji: string
  background: string
  backgroundSize: string
  backgroundBefore: string
  cardBackground: string
  cardBorder: string
  cardShadow: string
  titleGradient: string
  buttonGradient: string
  buttonColor: string
  buttonBorder: string
  cellBackground: string
  cellBorder: string
  cellHover: string
  xColor: string
  oColor: string
  modalWinBackground: string
  modalWinBorder: string
  modalLoseBackground: string
  modalLoseBorder: string
  modalDrawBackground: string
  modalDrawBorder: string
  promoCodeColor: string
  promoCodeBorder: string
}

export const themes: Record<Theme, ThemeColors> = {
  pink: {
    name: 'Розовая',
    emoji: '🌸',
    background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 25%, #ff9a9e 50%, #fecfef 75%, #fecfef 100%)',
    backgroundSize: '400% 400%',
    backgroundBefore: `
      radial-gradient(circle at 20% 50%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 192, 203, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(255, 182, 193, 0.2) 0%, transparent 50%)
    `,
    cardBackground: 'rgba(255, 255, 255, 0.98)',
    cardBorder: 'rgba(255, 182, 193, 0.3)',
    cardShadow: '0 25px 80px rgba(255, 105, 180, 0.25), 0 10px 30px rgba(255, 182, 193, 0.2)',
    titleGradient: 'linear-gradient(135deg, #ff6b9d 0%, #c44569 50%, #f8b500 100%)',
    buttonGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
    buttonColor: '#c44569',
    buttonBorder: 'rgba(255, 182, 193, 0.5)',
    cellBackground: 'linear-gradient(135deg, #fff5f5 0%, #ffe8e8 100%)',
    cellBorder: 'rgba(255, 182, 193, 0.4)',
    cellHover: 'linear-gradient(135deg, #ffeef8 0%, #ffdfd3 100%)',
    xColor: '#ff6b9d',
    oColor: '#ffb3ba',
    modalWinBackground: 'linear-gradient(135deg, #ffffff 0%, #ffeef8 50%, #ffdfd3 100%)',
    modalWinBorder: 'rgba(255, 182, 193, 0.6)',
    modalLoseBackground: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
    modalLoseBorder: 'rgba(200, 200, 200, 0.5)',
    modalDrawBackground: 'linear-gradient(135deg, #ffffff 0%, #fff9e6 50%, #ffe8d6 100%)',
    modalDrawBorder: 'rgba(255, 182, 140, 0.6)',
    promoCodeColor: '#ff6b9d',
    promoCodeBorder: '#ffb3ba',
  },
  lavender: {
    name: 'Лавандовая',
    emoji: '💜',
    background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 25%, #c2e9fb 50%, #a8edea 75%, #fed6e3 100%)',
    backgroundSize: '400% 400%',
    backgroundBefore: `
      radial-gradient(circle at 20% 50%, rgba(224, 195, 252, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(142, 197, 252, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(168, 237, 234, 0.2) 0%, transparent 50%)
    `,
    cardBackground: 'rgba(255, 255, 255, 0.98)',
    cardBorder: 'rgba(224, 195, 252, 0.3)',
    cardShadow: '0 25px 80px rgba(142, 197, 252, 0.25), 0 10px 30px rgba(224, 195, 252, 0.2)',
    titleGradient: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 50%, #3b82f6 100%)',
    buttonGradient: 'linear-gradient(135deg, #a78bfa 0%, #c4b5fd 50%, #ddd6fe 100%)',
    buttonColor: '#6366f1',
    buttonBorder: 'rgba(167, 139, 250, 0.5)',
    cellBackground: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    cellBorder: 'rgba(224, 195, 252, 0.4)',
    cellHover: 'linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%)',
    xColor: '#8b5cf6',
    oColor: '#a78bfa',
    modalWinBackground: 'linear-gradient(135deg, #ffffff 0%, #f5f3ff 50%, #ede9fe 100%)',
    modalWinBorder: 'rgba(224, 195, 252, 0.6)',
    modalLoseBackground: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
    modalLoseBorder: 'rgba(200, 200, 200, 0.5)',
    modalDrawBackground: 'linear-gradient(135deg, #ffffff 0%, #fef3c7 50%, #fde68a 100%)',
    modalDrawBorder: 'rgba(251, 191, 36, 0.6)',
    promoCodeColor: '#8b5cf6',
    promoCodeBorder: '#a78bfa',
  },
  peach: {
    name: 'Персиковая',
    emoji: '🍑',
    background: 'linear-gradient(135deg, #ffeaa7 0%, #fab1a0 25%, #fd79a8 50%, #fdcb6e 75%, #e17055 100%)',
    backgroundSize: '400% 400%',
    backgroundBefore: `
      radial-gradient(circle at 20% 50%, rgba(255, 234, 167, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(250, 177, 160, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(253, 121, 168, 0.2) 0%, transparent 50%)
    `,
    cardBackground: 'rgba(255, 255, 255, 0.98)',
    cardBorder: 'rgba(250, 177, 160, 0.3)',
    cardShadow: '0 25px 80px rgba(253, 121, 168, 0.25), 0 10px 30px rgba(250, 177, 160, 0.2)',
    titleGradient: 'linear-gradient(135deg, #fd79a8 0%, #e84393 50%, #fdcb6e 100%)',
    buttonGradient: 'linear-gradient(135deg, #fab1a0 0%, #ffeaa7 50%, #fdcb6e 100%)',
    buttonColor: '#e84393',
    buttonBorder: 'rgba(250, 177, 160, 0.5)',
    cellBackground: 'linear-gradient(135deg, #fff5e6 0%, #ffe8d6 100%)',
    cellBorder: 'rgba(250, 177, 160, 0.4)',
    cellHover: 'linear-gradient(135deg, #ffe8d6 0%, #ffd4b3 100%)',
    xColor: '#fd79a8',
    oColor: '#fab1a0',
    modalWinBackground: 'linear-gradient(135deg, #ffffff 0%, #ffe8d6 50%, #ffd4b3 100%)',
    modalWinBorder: 'rgba(250, 177, 160, 0.6)',
    modalLoseBackground: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 50%, #e8e8e8 100%)',
    modalLoseBorder: 'rgba(200, 200, 200, 0.5)',
    modalDrawBackground: 'linear-gradient(135deg, #ffffff 0%, #fff9e6 50%, #ffe8d6 100%)',
    modalDrawBorder: 'rgba(255, 212, 59, 0.6)',
    promoCodeColor: '#fd79a8',
    promoCodeBorder: '#fab1a0',
  },
  dark: {
    name: 'Тёмная',
    emoji: '🌙',
    background: 'linear-gradient(135deg, #2d1b69 0%, #11998e 25%, #38ef7d 50%, #667eea 75%, #764ba2 100%)',
    backgroundSize: '400% 400%',
    backgroundBefore: `
      radial-gradient(circle at 20% 50%, rgba(102, 126, 234, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(118, 75, 162, 0.2) 0%, transparent 50%),
      radial-gradient(circle at 40% 20%, rgba(17, 153, 142, 0.2) 0%, transparent 50%)
    `,
    cardBackground: 'rgba(30, 30, 46, 0.95)',
    cardBorder: 'rgba(102, 126, 234, 0.3)',
    cardShadow: '0 25px 80px rgba(0, 0, 0, 0.5), 0 10px 30px rgba(102, 126, 234, 0.2)',
    titleGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #38ef7d 100%)',
    buttonGradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    buttonColor: '#ffffff',
    buttonBorder: 'rgba(102, 126, 234, 0.5)',
    cellBackground: 'linear-gradient(135deg, #3d3d5c 0%, #2d2d44 100%)',
    cellBorder: 'rgba(102, 126, 234, 0.4)',
    cellHover: 'linear-gradient(135deg, #4d4d6c 0%, #3d3d5c 100%)',
    xColor: '#ff6b9d',
    oColor: '#38ef7d',
    modalWinBackground: 'linear-gradient(135deg, #3d3d5c 0%, #4d4d6c 50%, #5d5d7c 100%)',
    modalWinBorder: 'rgba(102, 126, 234, 0.6)',
    modalLoseBackground: 'linear-gradient(135deg, #2d2d44 0%, #3d3d5c 50%, #4d4d6c 100%)',
    modalLoseBorder: 'rgba(100, 100, 100, 0.5)',
    modalDrawBackground: 'linear-gradient(135deg, #3d3d5c 0%, #4d4d6c 50%, #5d5d7c 100%)',
    modalDrawBorder: 'rgba(255, 212, 59, 0.6)',
    promoCodeColor: '#ff6b9d',
    promoCodeBorder: '#667eea',
  },
}

