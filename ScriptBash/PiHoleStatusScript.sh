#!/bin/bash

piStatus=$(service pihole-FTL status | grep "active" | cut -d' ' -f7)

if [[ $piStatus == "active" ]] 
then 
    echo "[+] PiHole"
else 
    echo "[-] PiHole"
fi