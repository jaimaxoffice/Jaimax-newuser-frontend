// import { useState } from "react";
// import letsChatImage from "../../../../assets/communityfolder/letschatimage.png";
// import chatImage from "../../../../assets/communityfolder/chatimage-2.avif";
// import chatImage2 from "../../../../assets/communityfolder/chatimage-3.avif";

// const ChatOnboarding = ({ onFinish }) => {
//   const [step, setStep] = useState(0);

//   const slides = [
//     {
//       title: "Hello, Lets Chat",
//       text: "Having lots of friends will make your life more colorful",
//       image: letsChatImage
//     },
//     {
//       title: "Share Files",
//       text: "Send images, documents and videos easily",
//       image: chatImage
//     },
//     {
//       title: "Secure Messaging",
//       text: "Your chats are end-to-end encrypted",
//       image: chatImage2
//     }
//   ];

//   const next = () => {
//     if (step === slides.length - 1) {
//       onFinish();
//     } else {
//       setStep(step + 1);
//     }
//   };

//   return (
//     <div className="flex-1 h-full flex items-center justify-center bg-[#0b141a]">

//       <div className="max-w-full h-full w-full bg-white  overflow-hidden shadow-xl">

//         <div className="flex justify-center mt-6">

//         <img
//           src={slides[step].image}
//           alt=""
//           className="w-fit h-80 object-cover"
//         />
//         </div>

//         <div className="p-6 text-center">
//           <h2 className="text-xl font-semibold">{slides[step].title}</h2>

//           <p className="text-gray-500 text-sm mt-2">
//             {slides[step].text}
//           </p>

//           <button
//             onClick={next}
//             className="mt-6 px-4 py-2 w-auto bg-green-500 text-white rounded-full"
//           >
//             {step === slides.length - 1 ? "Get Started" : "Next"}
//           </button>
//         </div>

//       </div>

//     </div>
//   );
// };

// export default ChatOnboarding;

import { useState } from "react";
import chatImageBg from "../../../../assets/communityfolder/greenPattern.png";
import womenImage from "../../../../assets/communityfolder/womenimage.png";

const ChatOnboarding = ({ onFinish }) => {
  const [step, setStep] = useState(0);

  const slides = [
    {
      title: "Hello, Lets Chat",
      text: "Having lots of friends will make your life more colorful",
    },
    {
      title: "Share Files",
      text: "Send images, documents and videos easily",
    },
    {
      title: "Secure Messaging",
      text: "Your chats are end-to-end encrypted",
    },
  ];

  const next = () => {
    if (step === slides.length - 1) {
      onFinish();
    } else {
      setStep(step + 1);
    }
  };

  return (
    <div className="flex-1 h-full flex flex-col bg-[#0b141a]">
      
      {/* BACKGROUND */}
      <div
        className="h-full flex flex-col justify-end text-center"
        style={{
          backgroundImage: `url(${chatImageBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className=" flex justify-center">
            <img src={womenImage} alt="" className="w-[350px] h-full object-cover" />
        </div>

        <div className="bg-white py-8 rounded-tl-[50px]">

        {/* DOTS */}
        <div className="flex justify-center gap-2 mb-4">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step === i ? "w-6 bg-green-500" : "w-2 bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* TEXT */}
        <div key={step} className="transition-all duration-500 ease-in-out">
          <h2 className="text-xl sm:text-2xl font-semibold text-black">
            {slides[step].title}
          </h2>

          <p className="text-gray-600 text-xs sm:text-sm mt-3">
            {slides[step].text}
          </p>
        </div>

        {/* BUTTON */}
        <button
          onClick={next}
          className="mt-8 px-8 py-3 bg-green-500 text-white rounded-full"
        >
          {step === slides.length - 1 ? "Get Started" : "Next"}
        </button>

        </div>

      </div>
    </div>
  );
};

export default ChatOnboarding;