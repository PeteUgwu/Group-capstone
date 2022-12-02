const updateCounter = () => {
  const commentCount = document.querySelectorAll('.comment-sp');
  return commentCount.length;
};

export default updateCounter;