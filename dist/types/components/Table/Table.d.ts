import React, { HTMLAttributes } from 'react';
export interface TableColumn<T = Record<string, unknown>> {
    title: React.ReactNode;
    dataIndex?: keyof T;
    render?: (value: unknown, record: T, index: number) => React.ReactNode;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    fixed?: 'left' | 'right';
    style?: React.CSSProperties;
}
export interface TableProps {
    columns?: TableColumn[];
    dataSource?: Record<string, unknown>[];
    rowKey?: string | ((record: Record<string, unknown>) => string);
    striped?: boolean;
    showHeader?: boolean;
    rowClassName?: string | ((record: Record<string, unknown>, index: number) => string);
    onRow?: (record: Record<string, unknown>, index: number) => HTMLAttributes<HTMLTableRowElement>;
    loading?: boolean;
    emptyText?: React.ReactNode;
    scroll?: {
        x?: number | string;
        y?: number | string;
    };
    className?: string;
    style?: React.CSSProperties;
}
export declare const Table: React.FC<TableProps>;
