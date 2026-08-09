#!/bin/sh
# Download the CAASPP research files that caaspp.py reads.
# These are the California Department of Education's statewide "All Students" test-result
# files -- the primary source behind the Schools criterion and the enrolment trend.
# 2025 = current results; 2023 = the comparison year for the enrolment trend.
set -e
cd "$(dirname "$0")"
mkdir -p caaspp-data && cd caaspp-data
for YEAR in 2023 2025; do
  echo "fetching CAASPP $YEAR ..."
  curl -sSL -o "caaspp$YEAR.zip" \
    "https://caaspp-elpac.ets.org/caaspp/researchfiles/sb_ca${YEAR}_1_csv_v1.zip"
  unzip -o -q "caaspp$YEAR.zip" && rm -f "caaspp$YEAR.zip"
done
ls -la
