const AppVariant = (() => {
  const VARIANT = 'standard'; // change to 'heal' for therapeutic version
  return {
    current:    VARIANT,
    isHeal:     VARIANT === 'heal',
    isStandard: VARIANT === 'standard',
  };
})();
