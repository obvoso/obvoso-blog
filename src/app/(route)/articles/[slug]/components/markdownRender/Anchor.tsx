import Link from "@mui/material/Link"

type AnchorProps = {
  children: React.ReactNode
  href: string | undefined
}

export default function Anchor({ children, href }: AnchorProps) {
  return (
    <Link
      href={href}
      underline="none"
      sx={{
        color: "var(--primary)",
      }}
    >
      {children}
    </Link>
  )
}
