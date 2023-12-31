package com.ssafy.lighthouse.domain.common.entity;

import javax.persistence.Entity;

import com.ssafy.lighthouse.domain.common.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Entity
@Getter
@SuperBuilder
@NoArgsConstructor
public class Gugun extends BaseEntity {
    private Long sidoId;
    private String name;
}
