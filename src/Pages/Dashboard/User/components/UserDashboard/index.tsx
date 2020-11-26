import React, {FC, useCallback, useRef, useState} from 'react';

import Button from '../../../../../Components/Button';

import Dropdown from '../../../../../Components/Dropdown';

import {Delete, Edit, Loading} from '../../../../../Components/Icons';

import Input from '../../../../../Components/Input';

import Table from '../../../../../Components/Table';

import DashboardTemplate from '../../../../../Components/Template/dashboard';

import {Caption, Heading, Title} from '../../../../../Components/Typography';

import {TextVariants} from '../../../../../Components/Typography/types';

import Debounce from '../../../../../Helper/debounce';

import UserModal from '../UserModal';

import Notfound from '../../../../../assets/notfound.png';

import styles from './userdashboard.module.css';

import Notification from '../../../../../Components/Notification';

interface UserProps {
  userData?: any;
  loading?: boolean;
  createUser?: any;
  next?: any;
  total?: any;
  search?: any;
  noti?: boolean;
  err?: boolean;
  message?: string;
  editUser?: any;
  deleteUser?: any;
}

interface UserObj {
  id: number;
  fullname: string;
  username: string;
  email: string;
}

const UserDashboard: FC<UserProps> = ({
  userData,
  loading,
  createUser,
  next,
  total,
  search,
  editUser,
  deleteUser,
  noti,
  err,
  message,
}) => {
  const [show, setShow] = useState(false);

  const [userObj, setUserObj] = useState<UserObj>({
    id: 0,
    fullname: '',
    username: '',
    email: '',
  });

  const [modalStatus, setModalStatus] = useState('Create');

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1.0,
  };

  const observer: any = useRef();

  const lastUser = useCallback(
    (node: any) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          next();
        }
      }, options);
      if (node) observer.current.observe(node);
    },
    // eslint-disable-next-line
    [observer, userData],
  );

  const handleSearch = Debounce((e: any) => {
    let {value} = e.target;
    search(value);
  }, 500);

  const handleDelete = (user: any) => {
    setUserObj(user);
    setModalStatus('Delete');
    setShow(true);
  };

  const renderUser = () => {
    if (userData) {
      return userData.map((user: any, index: number) => {
        return (
          <tr
            ref={
              userData.length === index + 1 && userData.length < total
                ? lastUser
                : null
            }
            key={index}
            className={styles.listItem}
          >
            <td className={styles.listColumn}>
              <Title>{user.fullname}</Title>
              <Caption className={styles.username}>{user.username}</Caption>
            </td>
            <td className={styles.listColumn}>
              <Dropdown
                options={[
                  {name: 'Member'},
                  {name: 'Admin'},
                  {name: 'Super Admin'},
                ]}
              />
            </td>
            <td>
              <div className={styles.listColumn}>
                <div
                  onClick={() => {
                    setUserObj(user);
                    setModalStatus('Edit');
                    setShow(true);
                  }}
                  className={styles.edit}
                >
                  <Edit />
                </div>
                <div onClick={() => handleDelete(user)} className={styles.del}>
                  <Delete />
                </div>
              </div>
            </td>
          </tr>
        );
      });
    }
  };

  return (
    <DashboardTemplate
      head={'Users'}
      button={
        <Button
          onOK={() => {
            setModalStatus('Create');
            setUserObj({id: 0, fullname: '', username: '', email: ''});
            setShow(true);
          }}
        >
          Create
        </Button>
      }
    >
      {show ? (
        <UserModal
          modalStatus={modalStatus}
          userObj={userObj}
          createUser={createUser}
          editUser={editUser}
          deleteUser={deleteUser}
          setHide={() => {
            setShow(false);
          }}
        />
      ) : null}
      <div className={styles.filter}>
        <div className={styles.search}>
          <Input onChange={handleSearch} search placeholder="Search" />
        </div>
        <div className={styles.role}>
          <Dropdown
            options={[{name: 'Member'}, {name: 'Admin'}, {name: 'Super Admin'}]}
          />
        </div>
      </div>
      <Table
        thead={
          <tr>
            <th className={styles.head}>
              <Caption>Name</Caption>
            </th>
            <th className={styles.head}>
              <Caption>Role</Caption>
            </th>
          </tr>
        }
        tbody={
          userData ? (
            <tbody className={styles.body}>
              {userData.length > 0 ? (
                renderUser()
              ) : (
                <tr className={styles.notfound}>
                  <img
                    className={styles.notfoundimg}
                    src={Notfound}
                    alt="not found"
                  />
                  <Heading variant={TextVariants.S}>
                    Sorry! Can not find any user
                  </Heading>
                </tr>
              )}
              {loading ? (
                <tr className={styles.load}>
                  <Loading />
                </tr>
              ) : null}
            </tbody>
          ) : null
        }
      />
      <Notification noti={noti} error={err}>
        {message}
      </Notification>
    </DashboardTemplate>
  );
};

export default UserDashboard;