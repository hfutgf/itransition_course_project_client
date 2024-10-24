import { ReactNode, useEffect } from "react";
import TemplateHeader from "../shared/headers/templateHeader/TemplateHeader";
import useTemplateStore from "@/store/templates.store";

const TemplateLayout = ({ children }: { children: ReactNode }) => {
  const { setTemplate } = useTemplateStore();

  useEffect(() => {
    const template = JSON.parse(localStorage.getItem("template")!);
    if (template) {
      setTemplate(template);
    }
  }, [setTemplate]);

  return (
    <div>
      <TemplateHeader />
      {children}
    </div>
  );
};

export default TemplateLayout;
