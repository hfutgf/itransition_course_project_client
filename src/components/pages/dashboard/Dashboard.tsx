import Cards from "@/components/shared/dashboard/Cards";
import { queryConfig } from "@/config/query.config";
import { TemplateService } from "@/services/template.service";
import { useQuery } from "@tanstack/react-query";
import Loading from "../loading/Loading";
import CreateTemplate from "../../shared/modals/CreateTemplate";
import { useEffect } from "react";
import useTemplateStore from "@/store/template.store";

const Dashboard = () => {
  const { setTemplates, templates } = useTemplateStore();

  const templateService = new TemplateService();

  const { isPending, data } = useQuery({
    queryKey: [queryConfig.GET_TEMPLATES],
    queryFn: async () => await templateService.getAll(),
  });

  useEffect(() => {
    if (!isPending) {
      if (data) setTemplates(data);
    }
  }, [data, isPending, setTemplates]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto min-h-screen px-[32px] flex items-center flex-col justify-start gap-[20px]">
      <div className="w-full p-[24px]">
        <h4 className="text-[18px] font-[500] text-start text-dark">Create</h4>
        <div className="mt-[20px] flex items-center flex-wrap gap-[16px]">
          <div className="flex flex-col gap-[12px] w-[192px]">
            <CreateTemplate />
          </div>
        </div>
      </div>
      {templates?.map((item) => (
        <Cards key={item.theme} theme={item.theme} templates={item.data} />
      ))}
    </div>
  );
};

export default Dashboard;