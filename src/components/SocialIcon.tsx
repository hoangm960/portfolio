import { Icon } from "@iconify/react";

interface SocialIconProps {
    icon: string;
    size?: number;
    className?: string;
}

export function SocialIcon({ icon, size = 20, className = "" }: SocialIconProps) {
    return (
        <Icon
            icon={icon}
            width={size}
            height={size}
            className={className}
        />
    );
}
