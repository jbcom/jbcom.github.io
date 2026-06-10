/**
 * OOXML post-processing for the turbodocx output.
 *
 * @turbodocx/html-to-docx hardcodes two layout defects we cannot configure
 * away (verified against v1.21.0 source):
 *  1. Every table gets `tblCellMar` of 160 twips left/right + 80 top/bottom —
 *    our layout tables (section-heading rules, title/date rows) inherit a
 *    visible indent against body text and inflated vertical padding.
 *  2. An empty paragraph is emitted after every table — a dead line between
 *    each heading rule and its section body.
 *
 * These transforms run on word/document.xml before the buffer is written.
 * They are intentionally narrow string transforms, locked down by the
 * structural tests in tests/unit/resume-docx.test.ts.
 */

const CELL_MARGIN_PATTERN = /<w:tblCellMar>.*?<\/w:tblCellMar>/gs

const ZEROED_CELL_MARGIN =
  '<w:tblCellMar>' +
  '<w:top w:type="dxa" w:w="0"/>' +
  '<w:bottom w:type="dxa" w:w="0"/>' +
  '<w:left w:type="dxa" w:w="0"/>' +
  '<w:right w:type="dxa" w:w="0"/>' +
  '</w:tblCellMar>'

/** The empty paragraph turbodocx emits after each `</w:tbl>` — matched
 * whitespace-tolerantly because document.xml is pretty-printed. */
const EMPTY_PARAGRAPH_AFTER_TABLE =
  /(<\/w:tbl>)\s*<w:p>\s*<w:pPr>\s*<w:spacing w:lineRule="auto"\/>\s*<\/w:pPr>\s*<w:r>\s*<w:rPr\/>\s*<\/w:r>\s*<\/w:p>(?=\s*<w:(?:p|tbl)[\s>])/g

export function postprocessDocumentXml(xml: string): string {
  let out = xml.replace(CELL_MARGIN_PATTERN, ZEROED_CELL_MARGIN)

  // Drop the dead line after tables — but only when real content follows.
  // OOXML requires a trailing paragraph when a table ends the body, so the
  // lookahead excludes the one before <w:sectPr>.
  out = out.replace(EMPTY_PARAGRAPH_AFTER_TABLE, '$1')

  return out
}
