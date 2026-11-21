/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
export class JdbcTest {
    public static main(args: string[]) {
        /* forName */eval("com.mysql.cj.jdbc.Driver".split('.').slice(-1)[0]);
        const c: Connection = DriverManager.getConnection("jdbc:mysql://localhost/db1?user=root&password=welcome");
        const query: string = "select name from person ";
        const t1: number = /* currentTimeMillis */Date.now();
        let stmt: PreparedStatement;
        try {
            stmt = c.prepareStatement(query);
            stmt.setFetchSize(1000000);
            const rs: ResultSet = stmt.executeQuery();
            let i: number = 0;
            while((rs.next())) {{
                const x: string = rs.getString(1);
                console.info(x);
                i++;
            }};
        } catch(e) {
            console.error(e.message, e);
        }
        console.info(/* currentTimeMillis */Date.now() - t1);
    }
}
JdbcTest["__class"] = "oracle.dbtools.parser.mysql.JdbcTest";




JdbcTest.main(null);
