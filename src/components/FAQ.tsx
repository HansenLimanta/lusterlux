import { FC } from "react";
import { useState, useEffect } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { BiChevronDown } from "react-icons/bi";
import { faqList } from "../utils/constant";

type Tfaq = {
  question: string;
  answer: string;
};

const FAQ: FC = () => {
  const [faqState, setFaqState] = useState<Tfaq[]>([]);

  useEffect(() => {
    setFaqState(faqList);
  }, []);

  return (
    <>
      <h1 className="text-3xl">FAQ</h1>

      <Accordion.Root className="w-[800px] p-8 pt-4" type="single" collapsible>
        {faqState.map((faq, index) => (
          <Accordion.Item
            className="my-2 flex flex-col overflow-hidden rounded-md border bg-white"
            value={`item-${index}`}
            key={index}
          >
            <Accordion.Trigger className="AccordionTrigger data-[state=open]: flex items-center justify-between py-2 px-4 text-left hover:bg-slate-50">
              <p>{faq.question}</p>
              <BiChevronDown
                className="AccordionChevron"
                style={{
                  transition: "all 0.2s ease-in-out",
                  verticalAlign: "middle",
                }}
                size={20}
                aria-hidden
              />
            </Accordion.Trigger>
            <Accordion.Content className="bg-emerald-50  transition-all ease-in-out data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
              <p className="p-4">{faq.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </>
  );
};

export default FAQ;
