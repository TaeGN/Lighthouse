package com.ssafy.lighthouse.domain.study.dto;


import com.ssafy.lighthouse.global.util.PAGE;
import lombok.Data;

import java.util.List;

@Data
public class StudySearchOption {
    private int page;
    private String key;
    private String word;
    private String orderKey;
    private String orderBy;
    private int isOnline;
    private int status;
    private List<Long> tagIds;
    private Long sidoId;
    private Long gugunId;

    public int getOffset() {
        return (this.page) * PAGE.LIMIT;
    }

    public int getLimit() {
        return PAGE.LIMIT;
    }
}
