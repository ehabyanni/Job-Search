'use client'
import { useCallback, useEffect, useRef } from 'react';
import JobCard from '../../components/JobCard/JobCard';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs, incrementCursor } from '../../store/slices/jobSlice';
import './home.scss';

function Home() {
  const dispatch: any = useDispatch();
  const { jobs, status, cursor, next } = useSelector((state: any) => state.jobs);
  const observer = useRef<IntersectionObserver | null>(null);
  const isFetching = useRef(false); // for multiple fetches

  useEffect(() => {
    // Fetch the initial set of jobs
    dispatch(fetchJobs(cursor));
  }, [dispatch, cursor]);

  const lastJobElementRef = useCallback((node: any) => {
    if (status === 'loading' || isFetching.current || !next) return; //stop fetching
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        dispatch(incrementCursor());
        dispatch(fetchJobs(cursor + 12)).finally(() => {
          isFetching.current = false;
        });
      }
    });
    if (node) observer.current.observe(node);
  }, [status, next, dispatch, cursor]);

  return (
    <div>
      <div id="jobCardOuterContainer">
        <div id="jobCardHeader">
          <h1>All Jobs ({jobs?.length})</h1>
        </div>
        <div id="jobCardContainer">
          {jobs.map((job: any, index: number) => {
            if (jobs.length === index + 1) {
              return <JobCard ref={lastJobElementRef} key={job.id + job.attributes.title} job={job} />;
            } else {
              return <JobCard key={job.id} job={job} />;
            }
          })}
        </div>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <div id="jobCardOuterContainer">
  //       <div id="jobCardHeader">
  //         <h1>All Jobs ({jobs?.length})</h1>
  //       </div>
  //       <div id="jobCardContainer">
  //         {jobs.map((job: any) => (
  //           <JobCard key={job.id} job={job} />
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
}

export default Home;
