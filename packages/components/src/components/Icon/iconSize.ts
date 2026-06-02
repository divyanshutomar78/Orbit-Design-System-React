/**
 * Icon sizing uses Orbit platform tokens:
 * - small: --icon-frame-size-small frame, --icon-small glyph (web 18×18; iPad 24×24)
 * - big: --icon-frame-size-default frame, --icon-default glyph (web 24×24; iPad 44 frame / 24 glyph)
 */
export type OrbitIconSize = 'small' | 'big';

export function iconSizeClass(size: OrbitIconSize = 'small'): string {
  return size === 'big' ? 'orbit-icon--big' : 'orbit-icon--small';
}
