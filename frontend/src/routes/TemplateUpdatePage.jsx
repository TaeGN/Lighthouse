import React, { useEffect, useState } from 'react'
import { Row, Col, Tag, Tabs, Button, Tooltip, Input, Card } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBookmark as faBookmarkSolid,
  faHeart as faHeartSolid,
} from '@fortawesome/free-solid-svg-icons'
import {
  faBookmark as faBookmarkRegular,
  faHeart as faHeartRegular,
} from '@fortawesome/free-regular-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import TextArea from 'antd/es/input/TextArea'
import { studyAction } from '../store/study'
import { userAction } from '../store/user'
import { coverImage, image } from '../utils/image'
import UserName from '../components/Study/UserName'
import StudyReview from '../components/Study/StudyReview'
import {
  STATUS,
  StringToDate,
  endDateToString,
  startDateToString,
} from '../utils'
import DateRangePicker from '../components/Study/utils/DatePicker'
import StudyCurriculum from '../components/Study/StudyCurriculum'

export default function TemplateUpdatePage() {
  const dispatch = useDispatch()
  const studyId = window.location.pathname?.split('/template/update/')[1]
  const originalStudy = useSelector(state => state.study.studyDetail)
  const [startDate, setStartDate] = useState(
    StringToDate(originalStudy.startedAt),
  )
  const [endDate, setEndDate] = useState(StringToDate(originalStudy.endedAt))
  const [recruitFinishedDate, setRecruitFinishedDate] = useState(
    StringToDate(originalStudy.recruitFinishedAt),
  )
  const [createdDate, setCreatedDate] = useState(
    StringToDate(originalStudy.createdAt),
  )
  const [uploadedImage, setUploadedImage] = useState(null)
  const [uploadedImageFile, setUploadedImageFile] = useState(null)
  const [uploadedBadgeImage, setUploadedBadgeImage] = useState(null)
  const [uploadedBadgeImageFile, setUploadedBadgeImageFile] = useState(null)

  const copyOriginalStudy = () => {
    return {
      ...originalStudy,
      leaderProfile: { ...originalStudy.leaderProfile },
      studyTags: originalStudy?.studyTags && [...originalStudy.studyTags],
      sessions: originalStudy?.sessions && [...originalStudy.sessions],
      studyNotices: originalStudy?.studyNotices && [
        ...originalStudy.studyNotices,
      ],
      studyEvals: originalStudy?.studyEvals && [...originalStudy.studyEvals],
      badge: originalStudy?.badge && { ...originalStudy.badge },
    }
  }

  const [study, setStudy] = useState(copyOriginalStudy())

  const navigate = useNavigate()

  useEffect(() => {
    dispatch(studyAction.studyDetail(studyId))
    dispatch(userAction.profile(sessionStorage.getItem('userId')))
    dispatch(studyAction.getLike())
  }, [])

  useEffect(() => {
    setStudy(copyOriginalStudy())
  }, [originalStudy])

  const handleChangeStudy = e => {
    setStudy({ ...study, [e.target.name]: e.target.value })
  }

  const setIsOnline = isOnline => () => {
    setStudy({ ...study, isOnline })
  }

  const handleImageUpload = event => {
    const imageFile = event.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setUploadedImage(imageUrl)
      setUploadedImageFile(imageFile)
    }
  }

  const handleBadgeImageUpload = event => {
    const imageFile = event.target.files[0]
    if (imageFile) {
      const imageUrl = URL.createObjectURL(imageFile)
      setUploadedBadgeImage(imageUrl)
      setUploadedBadgeImageFile(imageFile)
    }
  }

  const handleStartDateChange = date => {
    setStartDate(date)
  }

  const handleEndDateChange = date => {
    setEndDate(date)
  }
  const handleRecruitFinishedDateChange = date => {
    setRecruitFinishedDate(date)
  }
  const handleCreatedDateChange = date => {
    setCreatedDate(date)
  }

  const copyStudy = (status = study.status) => {
    const formData = new FormData()
    formData.append('id', study.id)
    formData.append('isValid', study.isValid)
    formData.append('title', study.title)
    formData.append('description', study.description)
    formData.append('hit', study.hit)
    formData.append('rule', study.rule)
    formData.append('maxMember', study.maxMember)
    formData.append('minMember', study.minMember)
    formData.append('currentMember', study.currentMember)
    formData.append('isOnline', study.isOnline)
    formData.append('likeCnt', study.likeCnt)
    formData.append('bookmarkCnt', study.bookmarkCnt)
    formData.append('originalId', study.originalId ?? 0)
    if (study.sidoId) formData.append('sidoId', study.sidoId)
    if (study.gugunId) formData.append('gugunId', study.gugunId)
    formData.append('status', status)
    if (uploadedImageFile) formData.append('coverImgFile', uploadedImageFile)
    formData.append('coverImgUrl', study.coverImgUrl)
    formData.append(
      'createdAt',
      startDateToString(createdDate) ?? study.createdAt,
    )
    formData.append(
      'startedAt',
      startDateToString(startDate) ?? study.startedAt,
    )
    formData.append('endedAt', endDateToString(endDate) ?? study.createdAt)
    formData.append(
      'recruitFinishedAt',
      endDateToString(recruitFinishedDate) ?? study.recruitFinishedAt,
    )

    Object.keys(study).forEach(sKey => {
      // studyTags
      if (sKey === 'studyTags') {
        study.studyTags?.forEach((studyTag, index) => {
          Object.keys(studyTag).forEach(key => {
            if (key !== 'tag') {
              formData.append(`studyTags[${index}].${key}`, studyTag[key])
            } else {
              Object.keys(studyTag[key]).forEach(tagKey => {
                formData.append(
                  `studyTags[${index}].${key}.${tagKey}`,
                  studyTag[key][tagKey],
                )
              })
            }
          })
        })
      }

      // sessions
      else if (sKey === 'sessions') {
        // study.sessions?.forEach((session, index) => {
        //   Object.keys(session).forEach(key => {
        //     // studyMaterials
        //     if (key === 'studyMaterials') {
        //       session.studyMaterials?.forEach((studyMaterial, smIndex) => {
        //         Object.keys(studyMaterial).forEach(smKey => {
        //           formData.append(
        //             `sessions[${index}].${key}[${smIndex}].${smKey}`,
        //             studyMaterial[smKey],
        //           )
        //         })
        //       })
        //     }
        //     // sessionChecks
        //     else if (key === 'sessionChecks') {
        //       session.sessionChecks?.forEach((sessionCheck, scIndex) => {
        //         Object.keys(sessionCheck).forEach(scKey => {
        //           formData.append(
        //             `sessions[${index}].${key}[${scIndex}].${scKey}`,
        //             sessionCheck[scKey],
        //           )
        //         })
        //       })
        //     }
        //     // sessions
        //     else {
        //       formData.append(`sessions[${index}].${key}`, session[key])
        //     }
        //   })
        // })
      }

      // studyNotices
      else if (sKey === 'studyNotices') {
        study.studyNotices.forEach((studyNotice, index) => {
          Object.keys(studyNotice).forEach(key => {
            // studyNoticeChecks
            if (key === 'studyNoticeChecks') {
              studyNotice.studyNoticeChecks?.forEach(
                (studyNoticeCheck, scIndex) => {
                  Object.keys(studyNoticeCheck).forEach(scKey => {
                    formData.append(
                      `studyNotices[${index}].${key}[${scIndex}].${scKey}`,
                      studyNoticeCheck[scKey],
                    )
                  })
                },
              )
            }

            // studyNotices
            else {
              formData.append(`studyNotices[${index}].${key}`, studyNotice[key])
            }
          })
        })
      }

      // studyEvals
      else if (sKey === 'studyEvals') {
        study.studyEvals?.forEach((studyEval, index) => {
          Object.keys(studyEval).forEach(key => {
            formData.append(`studyEvals[${index}].${key}`, studyEval[key])
          })
        })
      }

      // leaderProfile
      else if (sKey === 'leaderProfile') {
        Object.keys(study.leaderProfile).forEach(key => {
          formData.append(`badge.${key}`, study.leaderProfile[key])
        })
      }

      // badge
      else if (sKey === 'badge') {
        if (study.badge) {
          Object.keys(study.badge).forEach(key => {
            if (key !== 'img') {
              formData.append(`badge.${key}`, study.badge[key])
            }
          })
        }
        if (uploadedBadgeImageFile) {
          formData.append(`badge.img`, uploadedBadgeImageFile)
        }
      }
    })

    return formData
  }

  const callStudyUpdateApi = async studyRequest => {
    dispatch(studyAction.studyUpdate(studyRequest)).then(() => {
      setUploadedImageFile(null)
      setUploadedBadgeImageFile(null)
    })
  }

  const handleUpdateStudy = () => {
    callStudyUpdateApi(copyStudy())
  }
  const handleRecruitStudy = () => {
    if (study.status === STATUS.PREPARING) {
      callStudyUpdateApi(copyStudy(STATUS.RECRUITING))
    }
    navigate(`/study/${study.id}`)
  }

  const myInfo = useSelector(state => state.user.myProfile)
  const likeList = useSelector(state => state.study.likeList)
  // 해당 스터디 가입한 사람과 그렇지 않은 사람 구분
  const tabMenu = [
    {
      정보: (
        <div
          style={{
            height: '1000px',
            width: '100%',
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        >
          <Card
            title="스터디 정보"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <TextArea
              className="text-area"
              name="description"
              onChange={handleChangeStudy}
              value={study.description}
              style={{
                height:
                  study.description &&
                  `${study.description.split('\n').length * 25}px`,
              }}
            />
          </Card>
          <Card
            title="스터디 규칙"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <TextArea
              className="text-area"
              name="rule"
              onChange={handleChangeStudy}
              value={study.rule}
              style={{
                height: study.rule && `${study.rule.split('\n').length * 25}px`,
              }}
            />
          </Card>
          <Card
            title="스터디 계획"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <div>
              <StudyCurriculum study={study} />
            </div>
          </Card>
        </div>
      ),
    },
    {
      '스터디 기간': (
        <div
          style={{
            height: '1000px',
            width: '100%',
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        >
          <Card
            title="스터디 기간"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <DateRangePicker
              changeStartDate={handleStartDateChange}
              changeEndDate={handleEndDateChange}
              initStartDate={study.startedAt}
              initEndDate={study.endedAt}
            />
          </Card>
          <Card
            title="스터디 모집 기간"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <DateRangePicker
              changeStartDate={handleCreatedDateChange}
              changeEndDate={handleRecruitFinishedDateChange}
              initStartDate={study.createdAt}
              initEndDate={study.recruitFinishedAt}
            />
          </Card>
        </div>
      ),
    },
    {
      '커버이미지 & 뱃지 수정': (
        <div
          style={{
            height: '1000px',
            width: '100%',
            backgroundColor: 'rgb(255, 255, 255)',
          }}
        >
          <Card
            title="커버 이미지 수정"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <input type="file" accept="image/*" onChange={handleImageUpload} />
          </Card>
          <Card
            title="뱃지 수정"
            bordered={false}
            style={{ boxShadow: 'none' }}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleBadgeImageUpload}
            />
          </Card>
        </div>
      ),
    },
    { '템플릿 리뷰': <StudyReview study={study} /> },
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <Row
          style={{
            backgroundColor: 'rgb(218, 230, 255)',
            height: '300px',
            padding: '40px',
          }}
        >
          <Col xs={24} sm={24} md={10} style={{ marginRight: '40px' }}>
            <img
              style={{
                width: '100%',
                height: '220px',
                marginLeft: '50%',
                transform: 'translateX(-50%)',
                objectFit: 'cover',
              }}
              src={uploadedImage || coverImage(originalStudy?.coverImgUrl)}
              alt="coverImage"
            />
          </Col>
          <Col>
            <h1 style={{ height: '40px' }}>
              <Input
                style={{ width: 'auto' }}
                className="input"
                name="title"
                onChange={handleChangeStudy}
                value={study.title}
              />
              <img
                src={uploadedBadgeImage || image(originalStudy.badge?.imgUrl)}
                alt={study.badge?.description}
                className="badge"
                style={{ height: '20px', width: '20px' }}
              />
            </h1>
            <p type="text" style={{ fontSize: '16px', margin: '10px 0' }}>
              스터디장: <UserName user={study.leaderProfile} />{' '}
            </p>
            <p>
              <Button
                style={{ width: 80 }}
                name="isOnline"
                onClick={setIsOnline(study.isOnline === 1 ? 0 : 1)}
                defaultValue="title"
              >
                {study.isOnline
                  ? '온라인'
                  : study.sido && study.gugun
                  ? `오프라인: 장소 - ${study.sido}, ${study.gugun}`
                  : '오프라인'}
              </Button>
              <div className="flex-container" style={{ margin: '10px 0' }}>
                <span className="flex-item">
                  현재 인원&nbsp; : &nbsp;&nbsp;
                </span>
                <span>{study.currentMember}</span>
              </div>
              <div className="flex-container">
                <span className="flex-item">
                  최대 인원&nbsp; : &nbsp;&nbsp;
                </span>
                <Input
                  className="input"
                  name="maxMember"
                  onChange={handleChangeStudy}
                  value={study.maxMember}
                />
              </div>
              <div className="flex-container">
                <span className="flex-item">
                  최소 인원&nbsp; : &nbsp;&nbsp;
                </span>
                <Input
                  className="input"
                  name="minMember"
                  onChange={handleChangeStudy}
                  value={study.minMember}
                />
              </div>
            </p>
            <div
              style={{
                fontSize: '12px',
                marginTop: '5px',
                height: '55px',
                overflow: 'hidden',
                marginBottom: '10px',
              }}
            >
              {study.studyTags.map(tag => {
                return (
                  <Tag
                    key={tag.id}
                    style={{
                      margin: '3px',
                    }}
                  >
                    #{tag.tag.keyword}
                  </Tag>
                )
              })}
            </div>
          </Col>
        </Row>
      </div>
      <div>
        <Row>
          <Col span={18}>
            <Tabs
              items={tabMenu.map((menu, index) => {
                return {
                  label: Object.keys(menu),
                  key: index,
                  children: Object.values(menu),
                }
              })}
            />
          </Col>
          {/* 사이드바 */}
          <Col span={6} style={{ paddingTop: '40px' }} align="middle">
            <div
              style={{
                width: '80%',
                height: '160px',
                border: 'solid 1px',
                borderColor: ' rgb(216, 216, 216)',
                borderRadius: '5%',
                position: 'sticky',
                top: '70px',
                padding: '10px',
              }}
            >
              <div className="flex-container-col align-center">
                <Button
                  type="primary"
                  style={{
                    marginTop: '30px',
                    width: '100%',
                    backgroundColor: 'green',
                  }}
                  onClick={handleUpdateStudy}
                >
                  템플릿 수정
                </Button>
                <Button
                  type="primary"
                  style={{ marginTop: '10px', width: '100%' }}
                  onClick={handleRecruitStudy}
                >
                  수정 완료
                </Button>
              </div>
              <Row style={{ marginTop: '10px' }}>
                {myInfo.bookmarkStudies?.find(
                  bookmarkStudy => bookmarkStudy.id === study.id,
                ) ? (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.disbookmark(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(userAction.profile(myInfo.id))
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="북마크 취소">
                      <FontAwesomeIcon
                        className="blue"
                        icon={faBookmarkSolid}
                        beat
                      />{' '}
                      {study.bookmarkCnt}
                    </Tooltip>
                  </Col>
                ) : (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.bookmark(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(userAction.profile(myInfo.id))
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="북마크">
                      <FontAwesomeIcon
                        className="blue"
                        icon={faBookmarkRegular}
                        beat
                      />{' '}
                      {study.bookmarkCnt}
                    </Tooltip>
                  </Col>
                )}

                {likeList.find(id => id === study.id) ? (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.dislike(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(studyAction.getLike())
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="좋아요 취소">
                      <FontAwesomeIcon
                        className="red"
                        icon={faHeartSolid}
                        beat
                      />{' '}
                      {study.likeCnt}
                    </Tooltip>
                  </Col>
                ) : (
                  <Col
                    span={12}
                    align="middle"
                    onClick={() => {
                      dispatch(studyAction.like(study.id)).then(() => {
                        dispatch(studyAction.studyDetail(study.id))
                        dispatch(studyAction.getLike())
                      })
                    }}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    <Tooltip title="좋아요">
                      <FontAwesomeIcon
                        className="red"
                        icon={faHeartRegular}
                        beat
                      />{' '}
                      {study.likeCnt}
                    </Tooltip>
                  </Col>
                )}
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}
