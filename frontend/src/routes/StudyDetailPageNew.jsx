import React, { useEffect } from 'react'
import { Tabs } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import SideComponent from '../components/Utils/SideComponent'
import StudyInfo from '../components/Study/StudyInfo'
import StudyQnA from '../components/Study/StudyQnA'
import StudyReview from '../components/Study/StudyReview'
import JoinStudyInfo from '../components/Study/join/JoinStudyInfo'
import StudyMember from '../components/Study/StudyMember'
import { studyAction } from '../store/study'

export default function TempDetailPage({ isLoggedIn }) {
  const dispatch = useDispatch()
  const studyId = window.location.pathname?.split('/')[2]
  const study = useSelector(state => state.study.studyDetail)

  console.log(study)

  useEffect(() => {
    dispatch(studyAction.studyDetail(studyId))
  }, [])
  const userId = sessionStorage.getItem('userId')
  console.log(study)

  // 해당 스터디 가입한 사람과 그렇지 않은 사람 구분
  const tabMenu = [
    { TempInfo: <StudyInfo study={study} /> },
    ...(study?.memberProfiles?.find(
      memberProfile => memberProfile.id === Number(userId),
    )?.id
      ? [{ 가입했을때정보: <JoinStudyInfo study={study} /> }]
      : [
          { TempQnA: <StudyQnA qnas={study?.qnas} /> },
          { 회원정보: <StudyMember members={study?.memberProfiles} /> },
          { TempReview: <StudyReview study={study} /> },
        ]),
  ]

  return <div></div>
}