import React, {FC, useCallback, useEffect, useState} from 'react';

import {RootStateOrAny, useDispatch, useSelector} from 'react-redux';

import ProjectDashboard from './components/ProjectDashboard';

import * as action from '../../../Redux/Project/action';

interface ProjectProps {}

const Project: FC<ProjectProps> = (props) => {
  const dispatch = useDispatch();

  const [status, setStatus] = useState(true);

  const [keyword, setKeyword] = useState('');

  const [sort, setSort] = useState({
    view: 'updated_at',
    order: 'desc',
  });

  const [page, setPage] = useState(1);

  const [filterPage, setFilterPage] = useState(1);

  const getProjectList = useCallback(
    () =>
      dispatch(
        action.getProjectList(
          status,
          keyword !== '' ? filterPage : page,
          keyword,
          sort,
        ),
      ),
    [dispatch, filterPage, page, keyword, status, sort],
  );

  const createProject = (project: any) =>
    dispatch(action.createProject(project));

  const resetPage = () => dispatch({type: 'RESET_MODULE'});

  const ProjectData = useSelector(
    (state: RootStateOrAny) => state.projectReducer.payload,
  );

  const total = useSelector(
    (state: RootStateOrAny) => state.projectReducer.total,
  );

  const loading = useSelector(
    (state: RootStateOrAny) => state.projectReducer.loading,
  );

  const filterList = useSelector(
    (state: RootStateOrAny) => state.projectReducer.filterList,
  );

  const noti = useSelector(
    (state: RootStateOrAny) => state.projectReducer.noti,
  );

  const error = useSelector(
    (state: RootStateOrAny) => state.projectReducer.error,
  );

  const message = useSelector(
    (state: RootStateOrAny) => state.projectReducer.message,
  );

  const totalPage = Math.round(total / 6);

  useEffect(
    () => {
      resetPage();
      setPage(1);
      setFilterPage(1);
    },
    // eslint-disable-next-line
    [keyword, status, sort],
  );

  useEffect(() => {
    getProjectList();
  }, [getProjectList]);

  return (
    <ProjectDashboard
      next={() => {
        if (keyword !== '')
          return filterPage < totalPage ? setFilterPage(filterPage + 1) : null;
        else if (keyword === '')
          return page < totalPage ? setPage(page + 1) : null;
      }}
      first={() => {
        setPage(1);
      }}
      createProject={createProject}
      status={setStatus}
      sort={setSort}
      noti={noti}
      err={error}
      message={message}
      loading={loading}
      projectData={keyword === '' ? ProjectData : filterList}
      total={total}
      search={setKeyword}
    />
  );
};

export default Project;
