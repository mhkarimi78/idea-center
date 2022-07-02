import React from "react";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";

import styles from "./user-item.module.css";

const UserItem = ({ username, profilePhoto, created, email, id }) => {
  return (
    <div className={styles.card}>
      <div className={styles.avatar}>
        <Link href="/users/[username]" as={`/users/${username}`}>
          <a>
            <img
              src={`https://avatars.dicebear.com/api/human/${id}.svg`}
              alt={username}
            />
          </a>
        </Link>
      </div>
      <div className={styles.body}>
        <Link href="/users/[username]" as={`/users/${username}`}>
          <a>{username}</a>
        </Link>
        <a>{email}</a>
        <p>
          created{" "}
          {created &&
            formatDistanceToNowStrict(new Date(created), {
              addSuffix: true,
            })}
        </p>
      </div>
    </div>
  );
};

export default UserItem;
