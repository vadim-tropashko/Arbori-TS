/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
/**
 * Matrix element
 * @author Dim
 * @class
 */
export interface Cell {
    /**
     * @return {number} length of the content: #of grammar symbols for CYK, #of rules for Earley
     */
    size(): number;

    /**
     * @param {number} index
     * @return {number} Earley rule at index
     */
    getRule(index: number): number;

    /**
     * @param {number} index
     * @return {number} position within Earley rule (partial parse) at cell index
     */
    getPosition(index: number): number;

    /**
     * Internal methods
     * @return {long[]}
     */
    getContent(): number[];

    insertContent(cellElem: number);
}


