import { useState } from "react";

const faqs = [
  {
    number: "01",
    question: "Lorem ipsum dolor sit amet consectetur adipiscing elit?",
    answer:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam.",
  },
  {
    number: "02",
    question: "Sed do eiusmod tempor incididunt ut labore?",
    answer:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur.",
  },
  {
    number: "03",
    question: "Ut enim ad minim veniam, quis nostrud?",
    answer:
      "Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat.",
  },
  {
    number: "04",
    question: "Exercitation ullamco laboris nisi ut aliquip ex?",
    answer:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
  },
  {
    number: "05",
    question: "Duis aute irure dolor in reprehenderit in voluptate?",
    answer:
      "Sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full py-14 px-4 sm:px-6">

      {/* Header */}
      <div className="text-center mb-10 sm:mb-14 md:mb-16">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 text-[#16213e]" style={{fontFamily:"var(--font-heading)"}}>
          Frequently Asked Questions
        </h2>
        <p className="text-sm sm:text-base text-[#16213e]/50">
          Voluptate velit esse quam nihil molestiae consequatur commodi.
        </p>
      </div>

      {/* Accordion */}
      <div className="max-w-5xl mx-auto">
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={i} className="border-b border-[#16213e]/10">
              <button
                className="w-full flex items-start justify-between gap-3 py-4 sm:py-5 text-left bg-transparent border-0 cursor-pointer"
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <div className="flex items-start gap-2.5 sm:gap-3 min-w-0">
                  {/* Orange number */}
                  <span className="text-xs sm:text-sm font-semibold shrink-0 mt-0.5 text-[#f46b1a]">
                    {faq.number}.
                  </span>
                  {/* Question */}
                  <span className="text-[13px] sm:text-[15px] font-semibold text-[#16213e] leading-snug">
                    {faq.question}
                  </span>
                </div>

                {/* Toggle icon */}
                <span
                  className={`shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-base font-medium leading-none transition-colors duration-200 mt-0.5
                    ${isOpen
                      ? "bg-[#16213e]/[0.07] text-[#16213e]"
                      : "bg-[#f46b1a]/10 text-[#f46b1a]"
                    }`}
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>

              {/* Answer — smooth expand */}
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="pb-4 sm:pb-5 pl-[30px] sm:pl-[34px] pr-2 text-[12px] sm:text-sm leading-relaxed text-[#16213e]/50">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}