import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './controlled-collapse.module.less';

export interface ControlledCollapseProps {
    /** 问题标题 */
    question: React.ReactNode;
    /** 答案内容 */
    answer: React.ReactNode;
    /** 是否展开（受控） */
    expanded: boolean;
    /** 展开状态变化回调 */
    onToggle: () => void;
    /** 是否禁用 */
    disabled?: boolean;
    /** 自定义类名 */
    className?: string;
    /** 自定义样式 */
    style?: React.CSSProperties;
}

export const ControlledCollapse: React.FC<ControlledCollapseProps> = ({
    question,
    answer,
    expanded,
    onToggle,
    disabled = false,
    className,
    style,
}) => {
    const [animating, setAnimating] = useState(false);
    const prevExpanded = useRef(expanded);

    useEffect(() => {
        if (prevExpanded.current !== expanded) {
            setAnimating(true);
            prevExpanded.current = expanded;
        }
    }, [expanded]);

    const handleTransitionEnd = useCallback(() => {
        setAnimating(false);
    }, []);

    const handleClick = () => {
        if (!disabled) onToggle();
    };

    const cls = [
        styles.faqCard,
        expanded && styles.expanded,
        disabled && styles.disabled,
        className,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <div className={cls} style={style}>
            <button
                className={styles.questionHeader}
                onClick={handleClick}
                disabled={disabled}
                aria-expanded={expanded}
            >
                <span className={styles.questionIcon}>
                    {expanded ? '−' : '+'}
                </span>
                <span className={styles.questionText}>{question}</span>
                <span className={styles.leafDecoration}>
                    <svg viewBox="0 0 24 24" width="20" height="20">
                        <path
                            fill="currentColor"
                            d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"
                        />
                    </svg>
                </span>
            </button>
            <div
                className={styles.answerWrapper}
                onTransitionEnd={handleTransitionEnd}
            >
                <div className={styles.answerContent}>{answer}</div>
            </div>
        </div>
    );
};

ControlledCollapse.displayName = 'ControlledCollapse';
