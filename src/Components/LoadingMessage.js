const LoadingMessage = ({ triggerMessage, setTriggerMessage }) => {
  return (
    <div
      className={`min-w-[340px] px-[20px] h-[50px]
        bg-green
      absolute flex rounded-[10px] top-[-80px] ${
        !triggerMessage ? "top-[-300px]" : "top-[30px]"
      } justify-center animate-bounce gap-[20px] items-center z-[20]`}
    >
      <>
        <p className="text-second200 font-[500] text-[18px]">
          Hang on. Your request is being processed!
        </p>
      </>
    </div>
  );
};

export default LoadingMessage;
