/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
/**
 * Verifies canonical filename components for Oracle object names.
 * @class
 */
export class DbObjNamesTest {
    objectNameToFilename_lowercasesCanonicalStandardNames() {
        Assertions.assertEquals("employees", DbObjNames.objectNameToFilename("EMPLOYEES"));
        Assertions.assertEquals("employee_data", DbObjNames.objectNameToFilename("EMPLOYEE_DATA"));
    }

    objectNameToFilename_hashesAndSanitizesExoticNames() {
        Assertions.assertEquals("myview34dd02dfc22200c0184d7ba601ec31fdd94f85977aeabc36729321327d14ff0c", DbObjNames.objectNameToFilename("../../My View"));
        Assertions.assertEquals("myview4eb378d452bbcbcfd406876a84d07b0c9d62aaae8db45b3d806abb2f301e0c4e", DbObjNames.objectNameToFilename("\"../../My View\""));
        Assertions.assertEquals("myview3e6f5085db53ef7097e1bd6f34dc698a303c4a1bdb291195b1083380a893a882", DbObjNames.objectNameToFilename("\"MyView\""));
        const lowercase: string = DbObjNames.objectNameToFilename("emp");
        Assertions.assertTrue(/* startsWith */((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(lowercase, "emp"));
        Assertions.assertNotEquals("emp", lowercase);
    }
}
DbObjNamesTest["__class"] = "oracle.arbori.util.DbObjNamesTest";




import { DbObjNames } from './DbObjNames';

