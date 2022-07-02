import React, { useEffect, useState } from "react";
import Link from "next/link";
import formatDistanceToNowStrict from "date-fns/formatDistanceToNowStrict";
import slug from "slug";

import Tag from "../../tag";

import styles from "./question-summary.module.css";
import { publicFetch } from "../../../util/fetcher";

const QuestionSummary = ({
  ideaId,
  title,
  tags,
  author,
  createdTime,
  children,
  status_type,
}) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data } = await publicFetch.get(`/auth​/users​​/${author}`);
      setUserInfo(data);
    };
    fetchUserInfo();
  }, [author]);
  return (
    <div className={styles.container}>
      <Link href="/ideas/[slug]" as={`/ideas/${ideaId}-${slug(title)}`}>
        <a className={styles.link}>{title}</a>
      </Link>
      <div className={styles.excerpt}>{children}</div>
      <div className={styles.footer}>
        <div className={styles.tagContainer}>
          {tags?.map(({ id, title }) => (
            <Tag key={id}>{title}</Tag>
          ))}
        </div>
        <div className={styles.userDetails}>
          <Link href="/users/[user]" as={`/users/${userInfo?.id}`}>
            <a>
              <img
                src={`https://avatars.dicebear.com/api/human/${userInfo?.username}.svg`}
                alt={userInfo?.username}
              />
            </a>
          </Link>
          <div className={styles.info}>
            <span>
              's idea{" "}
              {createdTime &&
                formatDistanceToNowStrict(new Date(createdTime), {
                  addSuffix: true,
                })}
            </span>
            <Link href="/users/[user]" as={`/users/${author?.username}`}>
              <a>{author?.username}</a>
            </Link>
          </div>
        </div>
      </div>
      <p style={{ color: "gray", fontWeight: "bold" }}>
        status type: {status_type}
      </p>
    </div>
  );
};

export default QuestionSummary;
