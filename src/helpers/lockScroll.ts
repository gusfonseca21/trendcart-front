function lockScroll(isModalOpen: boolean) {
  if (isModalOpen) disable();
  else enable();
}

const preventScroll = (e: WheelEvent) => {
  e.preventDefault();
  e.stopPropagation();
};

function disable() {
  document.body.addEventListener("wheel", preventScroll, {
    passive: false,
  } as AddEventListenerOptions);
}

function enable() {
  document.body.removeEventListener("wheel", preventScroll, {
    passive: false,
  } as AddEventListenerOptions);
}

export default lockScroll;
