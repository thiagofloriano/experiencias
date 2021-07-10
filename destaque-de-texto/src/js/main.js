(window).addEventListener('load', () => {
  const marks = document.querySelectorAll('.highlight')

  marks.forEach((mark) => {
    mark.classList.add('highlighted')
    console.log(mark.innerText)
  });
})
