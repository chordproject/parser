export enum LineType {
    Lyrics = "lyrics",
    Comment = "comment",
    Empty = "empty",
    Unknown = "unknown"
}

export abstract class Line {
    private _lineType: LineType = LineType.Unknown;
    protected get lineType(): LineType {
        return this._lineType;
    }

    /**
     * Abstract class Line's constructor
     */
    constructor(lineType:LineType) {
        this._lineType = lineType;
    }
}