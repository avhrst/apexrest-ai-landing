#!/usr/bin/env python3
"""Re-export supplied SVG geometry; crops artboards and resolves fills without redrawing."""
from pathlib import Path
from copy import deepcopy
import xml.etree.ElementTree as ET
ROOT = Path(__file__).resolve().parents[2]
SRC = ROOT / 'brand/source/APEXREST-logo'
OUT = ROOT / 'assets/brand'
NS = 'http://www.w3.org/2000/svg'
ET.register_namespace('', NS)
PALETTE = {'st0': '#31BEF9', 'st1': '#FFD541', 'st2': '#FF4141', 'st3': '#1E1E1E'}

def export(source, output, viewbox, title, *, light=False, symbol=False):
    tree = ET.parse(SRC / source).getroot()
    if symbol:
        art = deepcopy(list(tree)[4][0][0])
    else:
        art = ET.Element(f'{{{NS}}}g')
        for child in list(tree):
            if child.tag.endswith('g') and len(child):
                art.append(deepcopy(child))
    for element in art.iter():
        element.attrib.pop('id', None)
        klass = element.attrib.pop('class', None)
        if klass:
            element.set('fill', '#FFFFFF' if light else ('#1E1E1E' if 'bw' in source else PALETTE[klass]))
    svg = ET.Element(f'{{{NS}}}svg', {'viewBox': viewbox, 'role': 'img'})
    ET.SubElement(svg, f'{{{NS}}}title').text = title
    svg.append(art)
    ET.indent(svg, space='  ')
    (OUT / output).write_text(ET.tostring(svg, encoding='unicode') + '\n', encoding='utf-8')

OUT.mkdir(parents=True, exist_ok=True)
export('apex rgb line.svg','apexrest-logo.svg','16 157 368 86','APEXREST')
export('apex bw line .svg','apexrest-logo-mono.svg','16 157 368 86','APEXREST')
export('apex bw line .svg','apexrest-logo-light.svg','16 157 368 86','APEXREST',light=True)
export('apex rgb line.svg','apexrest-symbol.svg','16 157 86 86','APEXREST crossed pencil and ruler',symbol=True)
export('apex rgb line.svg','favicon.svg','10 151 98 98','APEXREST',symbol=True)
