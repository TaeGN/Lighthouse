package com.ssafy.lighthouse.domain.study.dto;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import com.ssafy.lighthouse.domain.common.dto.BadgeResponse;
import com.ssafy.lighthouse.domain.study.entity.Study;
import com.ssafy.lighthouse.domain.user.dto.SimpleProfileResponse;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
public class SimpleStudyDto {
    private Long id;
    private String createdAt;
    private int isValid;
    private String title;
    private String description;
    private int hit;
    private String rule;
    private String startedAt;
    private String endedAt;
    private String recruitFinishedAt;
    private int maxMember;
    private int minMember;
    private int currentMember;
    private int isOnline;
    private int likeCnt;
    private int bookmarkCnt;
    private int status;
    private Long originalId;
    private Long sidoId;
    private Long gugunId;
    private BadgeResponse badge;
    private List<StudyTagDto> studyTags;
    private SimpleProfileResponse leaderProfile;
    private String coverImgUrl;

    public void setLeaderProfile(SimpleProfileResponse leaderProfile) {
        this.leaderProfile = leaderProfile;
    }

    public SimpleStudyDto(Study study) {
        this.id = study.getId();
        this.createdAt = study.getCreatedAt();
        this.isValid = study.getIsValid();
        this.title = study.getTitle();
        this.description = study.getDescription();
        this.hit = study.getHit();
        this.rule = study.getRule();
        this.startedAt = study.getStartedAt();
        this.endedAt = study.getEndedAt();
        this.recruitFinishedAt = study.getRecruitFinishedAt();
        this.maxMember = study.getMaxMember();
        this.minMember = study.getMinMember();
        this.currentMember = study.getCurrentMember();
        this.isOnline = study.getIsOnline();
        this.likeCnt = study.getLikeCnt();
        this.bookmarkCnt = study.getBookmarkCnt();
        this.originalId = study.getOriginalId();
        this.sidoId = study.getSidoId();
        this.gugunId = study.getGugunId();
        this.status = study.getStatus();
        this.badge = study.getBadge() != null ? new BadgeResponse(study.getBadge()) : null;
        this.studyTags = study.getStudyTags() == null ? null : study.getStudyTags().stream().filter(BaseEntity::isValid).map(StudyTagDto::new).collect(Collectors.toList());
        this.coverImgUrl = study.getCoverImgUrl();
    }
}
