import SvgIcon from "./SvgIcon";

export function BuildingIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M4 21V5l8-3v19" />
      <path d="M12 9h8v12" />
      <path d="M2 21h20" />
      <path d="M7.5 7h1M7.5 11h1M7.5 15h1M15.5 13h1M15.5 17h1" />
    </SvgIcon>
  );
}

export function BlueprintIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 21V3l18 18z" />
      <path d="M7.5 16.5v-4.6l4.6 4.6z" />
      <path d="M3 7h2M3 11h2M3 15h2" />
    </SvgIcon>
  );
}

export function CasesIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M2 9h6M8 2v7M2 15h7v7M15 22v-5h7" />
      <path d="M16.5 12.5s-4-3.4-4-6.4a4 4 0 0 1 8 0c0 3-4 6.4-4 6.4z" />
      <circle cx="16.5" cy="6" r="1.2" />
    </SvgIcon>
  );
}

export function RegionIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z" />
      <path d="M9 3v15M15 6v15" />
    </SvgIcon>
  );
}

export function ZoningIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect
        x="10"
        y="3"
        width="11"
        height="7"
        fill="currentColor"
        fillOpacity=".28"
        stroke="none"
      />
      <rect x="3" y="3" width="18" height="18" rx="1.5" />
      <path d="M3 10h18M10 3v18M10 15h11M15 10v11" />
    </SvgIcon>
  );
}

export function RenewalIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 21v-6h6v6" />
      <path d="M13 21V7h8v14" />
      <path d="M2 21h20" />
      <path d="M16.5 11h1M16.5 15h1" />
      <path d="M5 11.5C5 7.5 7.5 5 11 5" />
      <path d="M9 3l2 2-2 2" />
    </SvgIcon>
  );
}

export function ResearchIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M3 21h11M5 21v-6M9 21v-9M13 21v-4" />
      <circle cx="16" cy="8" r="4" />
      <path d="M19 11l3 3" />
    </SvgIcon>
  );
}

export function FeasibilityIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 3v18M7 21h10M5 7h14" />
      <path d="M2 14l3-7 3 7a3 3 0 0 1-6 0z" />
      <path d="M16 14l3-7 3 7a3 3 0 0 1-6 0z" />
    </SvgIcon>
  );
}

export function ReviewIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M12 21H6a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
      <path d="M8.5 8h5M8.5 12h3" />
      <circle cx="17" cy="17" r="4" />
      <path d="M15.3 17.1l1.2 1.2 2.3-2.5" />
    </SvgIcon>
  );
}

export function ProjectManagementIcon(props) {
  return (
    <SvgIcon {...props}>
      <rect x="3" y="5" width="18" height="16" rx="1.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
      <path d="M7 14h4M7 17h7" />
    </SvgIcon>
  );
}

export function FacebookIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M15.5 3H14a4 4 0 0 0-4 4v14" />
      <path d="M7 11h8" />
    </SvgIcon>
  );
}

export function ArrowRightIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </SvgIcon>
  );
}

// site-data 以字串 key 指定圖示，避免資料檔直接引用元件
export const ICONS = {
  building: BuildingIcon,
  blueprint: BlueprintIcon,
  cases: CasesIcon,
  region: RegionIcon,
  zoning: ZoningIcon,
  renewal: RenewalIcon,
  research: ResearchIcon,
  feasibility: FeasibilityIcon,
  review: ReviewIcon,
  projectManagement: ProjectManagementIcon,
  facebook: FacebookIcon,
  arrowRight: ArrowRightIcon,
};

export function Icon({ name, ...props }) {
  const Component = ICONS[name];
  return Component ? <Component {...props} /> : null;
}
