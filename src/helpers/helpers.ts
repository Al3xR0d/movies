export const cutDescription = (text: string, limit: number) => {
  if (text.length <= limit) return text;
  const spaceIndex = text.indexOf(' ', limit);
  text = text.slice(0, spaceIndex);
  return text + ' ...';
};

export const getRatingBorderColor = (rating: number) => {
  if (rating >= 0 && rating < 3) {
    return '#E90000';
  } else if (rating >= 3 && rating < 5) {
    return '#E97E00';
  } else if (rating >= 5 && rating < 7) {
    return '#E9D100';
  } else if (rating >= 7) {
    return '#66E900';
  }
};
