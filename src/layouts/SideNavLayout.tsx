import SideNavBar from "@/components/SideNavBar";
type Props = {
  children: React.ReactNode;
};

const SideNavLayout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen bg-gray-1000/50 dark:bg-gray-50/50">
      <div className="grid w-[250px] border-r bg-white shadow-accent">
        <SideNavBar />
      </div>
      <div className="flex-1 flex flex-col min-h-0">{children}</div>
    </div>
  );
};

export default SideNavLayout;
