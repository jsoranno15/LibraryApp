import { DashboardBox } from "./DashboardBox";

export const Footer = () => {
  return (
    <footer className="px-4 pb-4 ">
      <DashboardBox>
        <div className="flex flex-row gap-5 text-xs text-ds-dark-purple-400 ">
          <a
            href={"https://www.julianasoranno.com/"}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-ds-dark-purple-600"
          >
            © 2024 Juliana Soranno
          </a>
          <div></div>
        </div>
      </DashboardBox>
    </footer>
  );
};
