#!/usr/bin/env python3
"""place_icon.py <deck.pptx> <slide-no> <card-index-0based> <icon.png> — swap the picture on one industry card
for the owner's chosen icon; bridges 0.1.13, whose builder does not yet read verticals[].icon."""
import sys; from pptx import Presentation
path, sno, idx, png = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]), sys.argv[4]
prs=Presentation(path); sl=list(prs.slides)[sno-1]
pics=sorted([sh for sh in sl.shapes if sh.shape_type==13], key=lambda s:(s.top, s.left))
pic=pics[idx]; part=pic.part.related_part(pic._element.blipFill.blip.rEmbed); part._blob=open(png,"rb").read()
prs.save(path); print(f"placed {png.split('/')[-1]} on slide {sno}, card {idx+1} of {len(pics)}")
