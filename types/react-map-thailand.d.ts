declare module '@react-map/thailand' {
    import * as React from 'react';

    export interface ThailandProps {
        className?: string;
        onSelect?: (provinceName: string | null) => void;
        type?: string;
        hoverColor?: string;
        selectColor?: string;
        strokeColor?: string;
        strokeWidth?: number;
        [key: string]: any; // Allow other props just in case
    }

    const Thailand: React.FC<ThailandProps>;
    export default Thailand;
}
