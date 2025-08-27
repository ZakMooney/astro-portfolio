const Modal = (props) => {
  const {
    open,
    closeModal,
    wide,
  } = props;

  return (
    <>
      {open ? (
        <div
          style={{
            position: 'fixed',
            inset: '0px',
            margin: '0px',
            display: 'grid',
            height: '100%',
            maxHeight: 'none',
            width: '100%',
            maxWidth: 'none',
            justifyItems: 'center',
            padding: '0px',
            overscrollBehavior: 'contain',
            zIndex: '999',
            backgroundColor: 'transparent',
            color: 'inherit',
            transitionDuration: '200ms',
            transitionTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
            transitionProperty: 'transform, opacity, visibility',
          }}
        >
          <div
            className={"z-40 absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-full px-4 md:px-0 " + (wide ? "max-w-[62rem]" : "max-w-[34rem]") }
          >
            {props.children}
          </div>
          <div
            onClick={closeModal}
            className="z-30 fixed inset-0 bg-slate-500/60 dark:bg-slate-900/80 backdrop-blur-md"
          />
        </div>
      ) : (null)}
    </>
  );
};

export default Modal;