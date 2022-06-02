/** @format */

import React from "react"
import styles from "./Group.module.css"

type GroupProps = {
  title?: string
  children?: React.ReactNode
}

export const Group: React.FC<GroupProps> = ({ title, children }) => (
  <div className={styles.group}>
    <div className={styles.groupLabelWrapper}>
      <div className={styles.groupLabel}>{title}</div>
    </div>
    <div className={styles.groupFrame}>{children}</div>
  </div>
)
