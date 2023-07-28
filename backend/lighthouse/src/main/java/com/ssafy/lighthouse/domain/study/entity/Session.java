package com.ssafy.lighthouse.domain.study.entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@ToString
@SuperBuilder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Session extends BaseEntity {
	private String startedAt;
	private String endedAt;
	private Long studyId;
	private String title;
	private String description;
	private String comment;
	private int status;
	private int seqNum;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "sessionId")
	private Set<StudyMaterial> studyMaterials;

	@OneToMany(fetch = FetchType.LAZY)
	@JoinColumn(name = "sessionId")
	private Set<SessionCheck> sessionChecks;

	public void update(String startedAt, String endedAt, Long studyId, String title, String description,
		String comment, int status, int seqNum) {
		this.startedAt = startedAt;
		this.endedAt = endedAt;
		this.studyId = studyId;
		this.title = title;
		this.description = description;
		this.comment = comment;
		this.status = status;
		this.seqNum = seqNum;
	}
}


