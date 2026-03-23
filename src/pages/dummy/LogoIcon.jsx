const LogoIcon = ({ shape }) => {
  switch (shape) {
    case "metamask":
      return (
        <svg width="20" height="20" viewBox="0 0 212 189">
          <polygon fill="#E2761B" points="106,0 0,189 212,189" />
        </svg>
      );

    case "binance":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#F3BA2F">
          <path d="M12 0l3 3-3 3-3-3 3-3zm6 6l3 3-3 3-3-3 3-3zM6 6l3 3-3 3-3-3 3-3zm6 6l3 3-3 3-3-3 3-3zm0-6l3 3-3 3-3-3 3-3z"/>
        </svg>
      );

    case "trust":
      return (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#3375BB">
          <path d="M12 0l10 4v6c0 5-3.5 9.7-10 14C5.5 19.7 2 15 2 10V4l10-4z"/>
        </svg>
      );

    default:
      return null;
  }
};