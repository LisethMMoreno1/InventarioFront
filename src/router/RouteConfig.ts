import React from 'react';


export interface RouteConfig {
    path: string;
    name?: string;
    icon?: React.ReactNode;  
    component?: React.ReactNode;
    children?: RouteConfig[];
}
