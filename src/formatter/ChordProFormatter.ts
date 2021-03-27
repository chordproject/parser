import { Song } from "../models";
import { EmptyLine, LyricsLine, TabLine } from "../models/lines";
import { IBuilder } from "./builders";
import { IFormatter } from "./IFormatter";

export class ChordProFormatter implements IFormatter {
    private _builder: IBuilder;
    private _lines: string[] = [];

    constructor(builder: IBuilder) {
        this._builder = builder;
    }

    format(song: Song): string[] {
        if (song.title?.trim()) {
            this._lines.push(...this._builder.titleMetadata(song.title));
        }
        if (song.subtitle?.trim()) {
            this._lines.push(...this._builder.subtitleMetadata(song.subtitle));
        }
        if (song.artists.length > 0) {
            this._lines.push(...this._builder.artistsMetadata(song.artists));
        }
        if (song.composers.length > 0) {
            this._lines.push(
                ...this._builder.composersMetadata(song.composers)
            );
        }
        if (song.lyricists.length > 0) {
            this._lines.push(
                ...this._builder.lyricistsMetadata(song.lyricists)
            );
        }
        if (song.arrangers.length > 0) {
            this._lines.push(
                ...this._builder.arrangersMetadata(song.arrangers)
            );
        }
        if (song.copyright?.trim()) {
            this._lines.push(
                ...this._builder.copyrightMetadata(song.copyright)
            );
        }
        if (song.time) {
            this._lines.push(...this._builder.timeMetadata(`${song.time.topNumber}/${song.time.bottomNumber}`));
        }
        if (song.tempo && song.tempo > 0) {
            this._lines.push(...this._builder.tempoMetadata(song.tempo));
        }
        if (song.year) {
            this._lines.push(...this._builder.yearMetadata(song.year));
        }
        if (song.duration && song.duration > 0) {
            this._lines.push(...this._builder.durationMetadata(song.duration));
        }
        if (song.key) {
            this._lines.push(...this._builder.keyMetadata(song.key.toString()));
        }
        if (song.capo && song.capo > 0) {
            this._lines.push(...this._builder.capoMetadata(song.capo));
        }
        if (song.customMetadatas.length > 0) {
            this._lines.push(
                ...this._builder.customMetadatas(song.customMetadatas)
            );
        }

        if (
            song.sections.length > 0 &&
            song.sections[0].lines.length > 0 &&
            !(song.sections[0].lines[0] instanceof EmptyLine)
        ) {
            this._lines.push(...this._builder.emptyLine());
        }

        song.sections.forEach((section) => {
            this._lines.push(...this._builder.sectionStart(section));
            section.lines.forEach((line) => {
                if (line instanceof EmptyLine) {
                    this._lines.push(...this._builder.emptyLine());
                } else if (line instanceof LyricsLine) {
                    this._lines.push(...this._builder.lyricsLine(line));
                } else if (line instanceof TabLine) {
                    this._lines.push(...this._builder.tabLine(line));
                }
            });

            this._lines.push(...this._builder.sectionEnd(section));
        });
        return this._lines;
    }
}
