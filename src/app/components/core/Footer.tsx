import { DashboardBox } from "./DashboardBox";

export const Footer = () => {
  return (
    <footer className="p-1 sm:px-4 sm:pb-4 pb-8">
      <DashboardBox>
        <div className="hidden sm:flex flex-row gap-5 text-xs text-ds-dark-purple-400 ">
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
