export interface Drama {
    bookId: number;
    bookName: string;
    coverWap: string;
    introduction: string;
    chapterCount: number;
    tags: string[];
    protagonist: string;
    rankVo?: {
        rankType: number;
        hotCode: string;
        sort: number;
    };
}

export interface DramaResponse {
    code: number;
    msg: string;
    data: Drama[];
}

export interface DetailDrama {
    bookId: number;
    bookName: string;
    coverWap: string;
    introduction: string;
    chapterCount: number;
    tags: string[];
    protagonist: string;
    items?: Episode[]; // Optional as it might be fetched separately
    rankVo?: {
        rankType: number;
        hotCode: string;
        sort: number;
    };
}

export interface Episode {
    id: number;
    name: string;
    url: string;
    image?: string;
}

// Raw API Types for parsing
export interface ApiEpisode {
    chapterId: string;
    chapterName: string;
    chapterImg: string;
    cdnList: CdnItem[];
}

export interface CdnItem {
    cdnDomain: string;
    videoPathList: VideoPath[];
}

export interface VideoPath {
    quality: number;
    videoPath: string;
}
