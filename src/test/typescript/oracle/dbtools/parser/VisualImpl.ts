/* Generated from Java with JSweet 3.1.0 - http://www.jsweet.org */
import { Service } from '../../arbori/util/Service';
import { Visual } from './Visual';

/**
 * Visualization of Matrix used by Earley and CYK methods
 * see: SQLEarley.main() for example usage
 * see also:  "CYK Performance Optimization" and "Earley Parsing" sections
 * in Parsers.doc for detailed explanation; fig 3a and up are snapshots
 * of the Visual panel
 * @author Vadim Tropashko
 * @param {LexerToken[]} s
 * @param {Parser} c
 * @class
 * @extends Visual
 */
export class VisualImpl extends Visual {
    src: Array<LexerToken>;

    par: Parser;

    /*private*/ zoom: number;

    /*private*/ offset: number;

    public causes: any;

    X: number;

    Y: number;

    img: BufferedImage;

    matrixImage: JLabel;

    public static pixels: number = 800;

    public constructor(s: Array<LexerToken>, c: Parser) {
        super(s, c);
        if (this.src === undefined) { this.src = null; }
        if (this.par === undefined) { this.par = null; }
        this.zoom = 1;
        this.offset = 0;
        if (this.causes === undefined) { this.causes = null; }
        if (this.X === undefined) { this.X = 0; }
        if (this.Y === undefined) { this.Y = 0; }
        if (this.img === undefined) { this.img = null; }
        this.matrixImage = null;
        this.yes = new JRadioButton("Yes");
        this.no = new JRadioButton("No");
        this.causes = <any>({});
        this.src = s;
        this.visited = <any> (function(dims) { let allocate = function(dims) { if (dims.length === 0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([/* size */(<number>this.src.length) + 1, /* size */(<number>this.src.length) + 1]);
        this.par = c;
        if (/* size */(<number>this.src.length) < 30)VisualImpl.pixels = (VisualImpl.pixels / 2|0);
        this.zoom = 1 + (VisualImpl.pixels / /* size */(<number>this.src.length)|0);
        this.offset = (this.zoom / 2|0);
        if (this.zoom === 1)this.offset = 0;
        const size: number = /* size */(<number>this.src.length);
        this.X = (size + 1) * this.zoom;
        this.Y = (size + 1) * this.zoom;
    }

    public draw$() {
        this.matrix.getVisual().draw$oracle_dbtools_parser_Matrix(this.matrix);
    }

    public draw$oracle_dbtools_parser_Matrix(m: Matrix) {
        this.img = this.drawMatrix(m);
        const frame: JFrame = new JFrame(/* getSimpleName */(c => typeof c === 'string' ? (<any>c).substring((<any>c).lastIndexOf('.')+1) : c["__class"] ? c["__class"].substring(c["__class"].lastIndexOf('.')+1) : c["name"].substring(c["name"].lastIndexOf('.')+1))((<any>this.par.constructor)) + " Matrix");
        try {
            frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        } catch(e) {
        }
        const t: JEditorPane = new JEditorPane();
        t.setEditorKit(new HTMLEditorKit());
        const editorScrollPane: JScrollPane = new JScrollPane(t);
        editorScrollPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS);
        editorScrollPane.setPreferredSize(new Dimension((VisualImpl.pixels / 2|0), VisualImpl.pixels + 150));
        editorScrollPane.setMinimumSize(new Dimension(100, 100));
        const radioPanel: JPanel = new JPanel();
        radioPanel.setLayout(new BoxLayout(radioPanel, BoxLayout.Y_AXIS));
        const optimGroup: ButtonGroup = new ButtonGroup();
        optimGroup.add(this.yes);
        optimGroup.add(this.no);
        radioPanel.add(new JLabel("Optim: "));
        radioPanel.add(this.yes);
        radioPanel.add(this.no);
        this.yes.addActionListener(this);
        this.no.addActionListener(this);
        const matrixPanel: JPanel = new JPanel(new BorderLayout());
        this.matrixImage = new VisualImpl.ScrollablePicture(this);
        matrixPanel.add(this.matrixImage, BorderLayout.CENTER);
        matrixPanel.add(radioPanel, BorderLayout.EAST);
        const canvasScrollPane: JScrollPane = new JScrollPane(matrixPanel);
        canvasScrollPane.setVerticalScrollBarPolicy(ScrollPaneConstants.VERTICAL_SCROLLBAR_AS_NEEDED);
        canvasScrollPane.setHorizontalScrollBarPolicy(ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
        canvasScrollPane.setPreferredSize(new Dimension(VisualImpl.pixels + 200, VisualImpl.pixels + 100));
        canvasScrollPane.setMinimumSize(new Dimension(300, 300));
        const sp: JSplitPane = new JSplitPane(JSplitPane.HORIZONTAL_SPLIT);
        sp.add(canvasScrollPane);
        sp.add(editorScrollPane);
        frame.getContentPane().add(sp);
        frame.pack();
        frame.setVisible(true);
    }

    public draw(m?: any) {
        if (((m != null && m instanceof <any>Matrix) || m === null)) {
            return <any>this.draw$oracle_dbtools_parser_Matrix(m);
        } else if (m === undefined) {
            return <any>this.draw$();
        } else throw new Error('invalid overload');
    }

    /*private*/ drawMatrix(matrix: Matrix): BufferedImage {
        this.matrix = matrix;
        const pixels: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(this.X * this.Y + 1);
        for(let j: number = 0; j < this.Y; ++j) {for(let i: number = 0; i <= this.X; ++i) {{
            const z: number = (j * this.X + i);
            const tmp: Cell = matrix.get((i / this.zoom|0), (j / this.zoom|0));
            if (tmp != null){
                const completeTime: number = Service.lY(this.visited[(i / this.zoom|0)][(j / this.zoom|0)]);
                const otherTime: number = Service.lX(this.visited[(i / this.zoom|0)][(j / this.zoom|0)]);
                pixels[z] = 13;
                if (completeTime + otherTime < 10000)pixels[z] = 14;
                if (100000 < completeTime + otherTime)pixels[z] = 0;
                if (1000000 < completeTime + otherTime)pixels[z] = 7;
            } else {
                if (j < i || this.visited != null && this.visited[(i / this.zoom|0)][(j / this.zoom|0)] === 0 || this.visited == null){
                    pixels[z] = 1;
                } else {
                    pixels[z] = 4;
                    if (this.visited != null){
                        const completeTime: number = Service.lY(this.visited[(i / this.zoom|0)][(j / this.zoom|0)]);
                        const otherTime: number = Service.lX(this.visited[(i / this.zoom|0)][(j / this.zoom|0)]);
                        if (5000 < completeTime + otherTime)pixels[z] = 3;
                    }
                }
            }
        };};}
        const dbuf: DataBuffer = new DataBufferByte(pixels, this.X * this.Y, 0);
        const numBanks: number = dbuf.getNumBanks();
        const bitMasks: number[] = [(<number>15|0)];
        const sampleModel: SampleModel = new SinglePixelPackedSampleModel(DataBuffer.TYPE_BYTE, this.X, this.Y, bitMasks);
        const raster: WritableRaster = Raster.createWritableRaster(sampleModel, dbuf, null);
        const colorModel: ColorModel = VisualImpl.generateColorModel();
        const img: BufferedImage = new BufferedImage(colorModel, raster, false, null);
        return img;
    }

    /*private*/ drawSrcText(g: Graphics) {
        if (this.zoom < 5)return;
        let pos: number = -1;
        for(let index = 0; index < this.src.length; index++) {
            let t = this.src[index];
            {
                pos++;
                if (50 < this.zoom)g.setFont(new Font(Font.SANS_SERIF, Font.BOLD, 20));
                g.setColor(Color.WHITE);
                g.drawString(t.content, (pos) * this.zoom + (2 * this.zoom / 3|0), (pos + 1) * this.zoom + (2 * this.zoom / 3|0));
            }
        }
    }

    /*private*/ static generateColorModel(): ColorModel {
        const r: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(16);
        const g: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(16);
        const b: number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(16);
        r[0] = 0;
        g[0] = 0;
        b[0] = 0;
        r[1] = 0;
        g[1] = 0;
        b[1] = (<number>192|0);
        r[2] = 0;
        g[2] = 0;
        b[2] = (<number>255|0);
        r[3] = 0;
        g[3] = (<number>192|0);
        b[3] = 0;
        r[4] = 0;
        g[4] = (<number>255|0);
        b[4] = 0;
        r[5] = 0;
        g[5] = (<number>192|0);
        b[5] = (<number>192|0);
        r[6] = 0;
        g[6] = (<number>255|0);
        b[6] = (<number>255|0);
        r[7] = (<number>192|0);
        g[7] = 0;
        b[7] = 0;
        r[8] = (<number>255|0);
        g[8] = 0;
        b[8] = 0;
        r[9] = (<number>192|0);
        g[9] = 0;
        b[9] = (<number>192|0);
        r[10] = (<number>255|0);
        g[10] = 0;
        b[10] = (<number>255|0);
        r[11] = (<number>192|0);
        g[11] = (<number>192|0);
        b[11] = 0;
        r[12] = (<number>255|0);
        g[12] = (<number>255|0);
        b[12] = 0;
        r[13] = (<number>80|0);
        g[13] = (<number>80|0);
        b[13] = (<number>80|0);
        r[14] = (<number>192|0);
        g[14] = (<number>192|0);
        b[14] = (<number>192|0);
        r[15] = (<number>255|0);
        g[15] = (<number>255|0);
        b[15] = (<number>255|0);
        return new IndexColorModel(4, 16, r, g, b);
    }

    /*private*/ yes: JRadioButton;

    /*private*/ no: JRadioButton;

    public actionPerformed(e: ActionEvent) {
        this.recalculate(e.getSource() === this.yes);
    }

    public recalculate(optim: boolean) {
        this.causes = <any>({});
        if (this.visited != null){
            this.visited = <any> (function(dims) { let allocate = function(dims) { if (dims.length === 0) { return 0; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([/* size */(<number>this.src.length) + 1, /* size */(<number>this.src.length) + 1]);
            (<Earley>this.par).skipRanges = optim;
            this.matrix = this.matrix.recalc();
            (<Earley>this.par).parse$java_util_List$oracle_dbtools_parser_Matrix(this.src, this.matrix);
        }
        this.img = this.drawMatrix(this.matrix);
        this.matrixImage.repaint();
    }
}
VisualImpl["__class"] = "oracle.dbtools.parser.VisualImpl";


export namespace VisualImpl {

    export class ScrollablePicture extends JLabel implements Scrollable {
        public __parent: any;
        public constructor(__parent: any) {
            super(new ScrollablePicture.ScrollablePicture$0(this));
            this.__parent = __parent;
            this.x0 = -1;
            this.y0 = -1;
            this.output = null;
            this.index = 0;
            this.ambig = 0;
            this.setAutoscrolls(true);
            this.addMouseMotionListener(this);
            this.addMouseWheelListener(this);
        }

        public mouseDragged(e: MouseEvent) {
            const r: Rectangle = new Rectangle(e.getX(), e.getY(), 10, 10);
            this.scrollRectToVisible(r);
        }

        /**
         * If at different cell update rule panel content
         * @param {MouseEvent} e
         */
        public mouseMoved(e: MouseEvent) {
            e.consume();
            const x: number = (e.getX() / this.__parent.zoom|0);
            const y: number = (e.getY() / this.__parent.zoom|0);
            if (x > /* size */(<number>this.__parent.src.length))return;
            if (y > /* size */(<number>this.__parent.src.length))return;
            if (x !== this.x0 || y !== this.y0){
                this.index = 0;
                this.ambig = 0;
            }
            this.output = this.__parent.matrix.get(x, y);
            if (this.output != null){
                this.x0 = x;
                this.y0 = y;
                this.updatePane(t);
                this.repaint();
            } else if (this.x0 !== -1){
                this.repaint();
                this.x0 = -1;
                this.y0 = -1;
            }
            let tooltip: string = "<html><font color=rgb(150,100,100) size=+2>[" + x + "," + y + ")</font>";
            if (this.__parent.visited != null){
                const completeTime: number = Service.lY(this.__parent.visited[x][y]);
                const otherTime: number = Service.lX(this.__parent.visited[x][y]);
                tooltip += " time = <font color=rgb(100,150,100) size=+2> " + (completeTime + otherTime);
                tooltip += "</font> = <font color=rgb(150,100,100) size=+1> " + completeTime;
                tooltip += "</font> (completetion) + <font color=rgb(100,100,150)  size=+1> " + otherTime;
            }
            this.setToolTipText(tooltip);
        }

        updatePane(t: JEditorPane) {
            const sb: { str: string, toString: Function } = { str: "<html><font color=red size=+1>[" + this.x0 + "," + this.y0 + ")</font><br>", toString: function() { return this.str; } };
            const pos: number = this.updatePane4Earley(sb);
            /* append */(sb => { sb.str += <any>"<font color=green  size=+1><br><br>"; return sb; })(sb);
            for(let i: number = this.x0; i < this.y0; i++) {{
                /* append */(sb => { sb.str += <any>" " + /* get */this.__parent.src[i].content; return sb; })(sb);
            };}
            t.setText(/* toString */sb.str);
            t.setCaretPosition(pos);
        }

        public updatePane4Earley(sb: { str: string, toString: Function }): number {
            let ret: number = 0;
            for(let j: number = 0; j < this.output.size(); j++) {{
                const pos: number = this.output.getPosition(j);
                const ruleNo: number = this.output.getRule(j);
                let mid: number = -1;
                if (j === this.index){
                    mid = /* get */this.__parent.matrix.getEarleyBackptrs(this.x0, this.y0, this.output, j)[this.ambig];
                    const tmp: string = /* replaceAll *//* toString */sb.str.replace(new RegExp("\\<[^>]*>", 'g'),"");
                    ret = tmp.length;
                }
                /* append */(sb => { sb.str += <any>"<br>"; return sb; })(sb);
                this.__parent.par.toHtml(ruleNo, pos, j === this.index, this.x0, mid, this.y0, this.__parent.matrix, sb);
            };}
            return ret;
        }

        x0: number;

        y0: number;

        output: Cell;

        index: number;

        ambig: number;

        public getPreferredScrollableViewportSize(): Dimension {
            return null;
        }

        public getScrollableBlockIncrement(visibleRect: Rectangle, orientation: number, direction: number): number {
            return 0;
        }

        public getScrollableTracksViewportHeight(): boolean {
            return false;
        }

        public getScrollableTracksViewportWidth(): boolean {
            return false;
        }

        public getScrollableUnitIncrement(visibleRect: Rectangle, orientation: number, direction: number): number {
            return 0;
        }

        public paint(g: Graphics) {
            super.paint(g);
            if (this.x0 !== -1 && ((this.__parent.par != null && this.__parent.par instanceof <any>Earley) && this.x0 <= this.y0 && this.index < this.output.size())){
                g.setColor(Color.red);
                let mid: number = -1;
                mid = /* get */this.__parent.matrix.getEarleyBackptrs(this.x0, this.y0, this.output, this.index)[this.ambig];
                if (this.y0 < mid){
                    g.drawLine(this.x0 * this.__parent.zoom + this.__parent.offset, (this.y0 - 1) * this.__parent.zoom + this.__parent.offset, this.x0 * this.__parent.zoom + this.__parent.offset, this.y0 * this.__parent.zoom + this.__parent.offset);
                    return;
                }
                if (this.x0 <= mid)g.drawLine(this.x0 * this.__parent.zoom + this.__parent.offset, mid * this.__parent.zoom + this.__parent.offset, this.x0 * this.__parent.zoom + this.__parent.offset, this.y0 * this.__parent.zoom + this.__parent.offset);
                g.drawLine(this.x0 * this.__parent.zoom + this.__parent.offset, this.y0 * this.__parent.zoom + this.__parent.offset, mid * this.__parent.zoom + this.__parent.offset, this.y0 * this.__parent.zoom + this.__parent.offset);
            }
        }

        /**
         * Iterate through alternative rules derivations
         * @param {MouseWheelEvent} e
         */
        public mouseWheelMoved(e: MouseWheelEvent) {
            if (this.output == null)return;
            let ambiguityFactor: number = -1;
            ambiguityFactor = /* size */(<number>this.__parent.matrix.getEarleyBackptrs(this.x0, this.y0, this.output, this.index).length);
            if (0 <= this.ambig + e.getWheelRotation() && this.ambig + e.getWheelRotation() < ambiguityFactor){
                this.ambig += e.getWheelRotation();
            } else {
                this.ambig = 0;
                this.index += e.getWheelRotation() > 0 ? 1 : -1;
                if (this.index < 0)this.index = this.output.size() + this.index;
                if (this.index >= this.output.size())this.index = this.index - this.output.size();
            }
            this.repaint();
            this.updatePane(t);
        }
    }
    ScrollablePicture["__class"] = "ScrollablePicture";
    ScrollablePicture["__interfaces"] = ["javax.swing.Scrollable","javax.swing.TransferHandler.HasGetTransferHandler","javax.accessibility.Accessible","javax.swing.SwingConstants"];



    export namespace ScrollablePicture {

        export class ScrollablePicture$0 implements Icon {
            public __parent: any;
            public getIconHeight(): number {
                return this.__parent.__parent.Y;
            }

            public getIconWidth(): number {
                return this.__parent.__parent.X;
            }

            public paintIcon(c: Component, g: Graphics, x: number, y: number) {
                g.drawImage(this.__parent.__parent.img, 0, 0, Color.orange, null);
                this.__parent.__parent.drawSrcText(g);
            }

            constructor(__parent: any) {
                this.__parent = __parent;
            }
        }
        ScrollablePicture$0["__interfaces"] = ["javax.swing.Icon"];


    }

}




import { Earley } from './Earley';


import { Cell } from './Cell';


import { Matrix } from './Matrix';


import { Parser } from './Parser';


import { LexerToken } from './LexerToken';

