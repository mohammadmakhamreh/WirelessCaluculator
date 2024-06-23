let communicationButton = document.getElementById("communication-button");
let communicationResult = document.getElementById("communicationResult");

let powerButton = document.getElementById("power-button");
let powerResult = document.getElementById("powerResult");

let throughputButton = document.getElementById("throughput-button");
let throughputResult = document.getElementById("throughputResult");


let communicationCalculate = () => {
   // event.preventDefault(); // Prevents the default form submission

    let bandwidth = Number(document.getElementById("communicationBandwidth").value);

    
   let quantizerLevelBitValue = Number(document.getElementById("quantizerLevelBit").value);

    let quantizerInputType = document.getElementById("quantizer-bits-level").value;

    let sourceEncoderRatio = Number(document.getElementById("sourceEncoderRatio").value);
    let channelEncoderRate = Number(document.getElementById("channelEncoderRate").value);
    let interleaverBits = Number(document.getElementById("InterleaverBits").value);

    if(quantizerInputType == "bits"){

        let samplingFreq = 2*bandwidth;
        let res = 2 ** quantizerLevelBitValue;
        let inputSourceBitRate = samplingFreq * quantizerLevelBitValue;
        let outputSourceBitRate = inputSourceBitRate * sourceEncoderRatio; 
        let outputChannelBitRate = outputSourceBitRate/channelEncoderRate;
        communicationResult.innerHTML = `<div> Levels : ${res} </div> <div>Sampling Frequency: ${samplingFreq} KHz</div>
        </div> <div>Input Source Bit Rate: ${inputSourceBitRate} Bit/sec</div></div> <div>Output Source Bit Rate: ${outputSourceBitRate} Bit/Sec</div>
        <div>Output Channel Encoder Bit Rate: ${outputChannelBitRate} Kbps</div><div>Output Bit Rate at the interleaver: ${outputChannelBitRate} Kbps</div>`

    } else{
        let samplingFreq = 2*bandwidth;
        let res = Math.log2(quantizerLevelBitValue);
        res = Math.ceil(res);
        let inputSourceBitRate = samplingFreq * res;
        let outputSourceBitRate = inputSourceBitRate * sourceEncoderRatio; 
        let outputChannelBitRate = outputSourceBitRate/channelEncoderRate;
        communicationResult.innerHTML = `<div> Bits : ${res} </div> <div>Sampling Frequency: ${samplingFreq} KHz</div>
        </div> <div>Input Source Bit Rate: ${inputSourceBitRate} Bit/sec</div></div> <div>Output Source Bit Rate: ${outputSourceBitRate} Bit/Sec</div>
        <div>Output Channel Encoder Bit Rate: ${outputChannelBitRate} Kbps</div><div> Output Bit Rate at the interleaver: ${outputChannelBitRate} Kbps</div>`


    }



//    communicationResult.innerHTML = `<div> Bandwidth: ${bandwidth.toFixed(2)}  </div>`

    console.log(bandwidth,quantizerLevelBitValue,quantizerInputType,sourceEncoderRatio,channelEncoderRate);
    


};

communicationButton.addEventListener("click",communicationCalculate);
//window.addEventListener("load",communicationCalculate);

// ---------------------------------------------OFDM Caluclator-------------------------------------------------------

// OFDM Calculator
let ofdmButton = document.getElementById("ofdm-button");
let ofdmResult = document.getElementById("ofdmResult");

let ofdmCalculate = () => {
    let bandwidth = Number(document.getElementById("ofdmBandwidth").value);
    let bandwidthUnit = document.getElementById("ofdmBandwidthUnit").value;
    let subcarrierSpacing = Number(document.getElementById("subcarrierSpacing").value);
    let subcarrierSpacingUnit = document.getElementById("subcarrierSpacingUnit").value;
    let resourceBlockDuration = Number(document.getElementById("resourceBlockDuration").value);
    let resourceBlockDurationUnit = document.getElementById("resourceBlockDurationUnit").value;
    let number2n = Number(document.getElementById("number2n").value);
    let numberOfOfdm = Number(document.getElementById("numberOfOfdm").value);
    let parallelResourceBlock = Number(document.getElementById("parallelResourceBlock").value);

    if (bandwidthUnit === "KHz") bandwidth *= 1000;
    if (subcarrierSpacingUnit === "KHz") subcarrierSpacing *= 1000;
    if (resourceBlockDurationUnit === "msec") resourceBlockDuration /= 1000;

    let validationMessage = "";
    if (subcarrierSpacing >= bandwidth) {
        validationMessage += "<div>Subcarrier spacing must be less than bandwidth.</div>";
    }

    if (bandwidth % subcarrierSpacing !== 0) {
        validationMessage += "<div>The result of bandwidth divided by subcarrier spacing must be a whole number.</div>";
    }

    let numSubcarriers = bandwidth / subcarrierSpacing;
    let bitsPerResourceElement = Math.log2(number2n);
    let numOfdmSymbols = bitsPerResourceElement * numSubcarriers;
    let bitsPerOfdmResourceBlock = numberOfOfdm * numOfdmSymbols;
    let maxTransmissionRate = (parallelResourceBlock * bitsPerOfdmResourceBlock) / resourceBlockDuration;

    if (!validationMessage) {
        ofdmResult.innerHTML = `<div>Number of bits per resource element: ${bitsPerResourceElement}</div>
        <div>Number of OFDM symbols: ${numOfdmSymbols}</div>
        <div>Number of bits per OFDM resource block: ${bitsPerOfdmResourceBlock}</div>
        <div>Maximum transmission rate for the user: ${maxTransmissionRate} bits/second</div>`;
    } else {
        ofdmResult.innerHTML = validationMessage;
    }

    console.log(bandwidth, subcarrierSpacing, resourceBlockDuration, number2n, numberOfOfdm, parallelResourceBlock);
};

ofdmButton.addEventListener("click", ofdmCalculate);

// Question 3 ---------------------------------------------------------------------------------------------------------------------
const sixteenPSK = [
    { EbNo: 0, BER: 0.45 },
    { EbNo: 1, BER: 0.4 },
    { EbNo: 2, BER: 0.35 },
    { EbNo: 3, BER: 0.3 },
    { EbNo: 4, BER: 0.25 },
    { EbNo: 5, BER: 0.2 },
    { EbNo: 6, BER: 0.15 },
    { EbNo: 7, BER: 0.1 },
    { EbNo: 8, BER: 0.07 },
    { EbNo: 9, BER: 0.05 },
    { EbNo: 10, BER: 0.03 },
    { EbNo: 11, BER: 0.01 },
    { EbNo: 12, BER: 0.009 },
    { EbNo: 13, BER: 0.005 },
    { EbNo: 14, BER: 0.001 },
    { EbNo: 15, BER: 0.0003 },
    { EbNo: 16, BER: 0.0001 },
    { EbNo: 17, BER: 0.00004 },
    { EbNo: 18, BER: 0.000003 }
];

const eightPSK = [
    { EbNo: 0, BER: 0.25 },
    { EbNo: 1, BER: 0.2 },
    { EbNo: 2, BER: 0.1 },
    { EbNo: 3, BER: 0.08 },
    { EbNo: 4, BER: 0.06 },
    { EbNo: 5, BER: 0.04 },
    { EbNo: 6, BER: 0.02 },
    { EbNo: 7, BER: 0.01 },
    { EbNo: 8, BER: 0.008 },
    { EbNo: 9, BER: 0.005 },
    { EbNo: 10, BER: 0.001 },
    { EbNo: 11, BER: 0.0003 },
    { EbNo: 12, BER: 0.0001 },
    { EbNo: 13, BER: 0.00001 },
    { EbNo: 14, BER: 0.000001 },
    { EbNo: 15, BER: 0.00000005 }
];

const bpskQpsk = [
    { EbNo: 0, BER: 0.1 },
    { EbNo: 1, BER: 0.08 },
    { EbNo: 2, BER: 0.06 },
    { EbNo: 3, BER: 0.04 },
    { EbNo: 4, BER: 0.01 },
    { EbNo: 5, BER: 0.008 },
    { EbNo: 6, BER: 0.004 },
    { EbNo: 7, BER: 0.001 },
    { EbNo: 8, BER: 0.0002 },
    { EbNo: 9, BER: 0.00003 },
    { EbNo: 10, BER: 0.000003 },
    { EbNo: 11, BER: 0.0000004 },
    { EbNo: 12, BER: 0.00000001 }
];

let powerCalculate = () => {
    const W_to_dB = W => 10 * Math.log10(W);
    const dB_to_W = dB => Math.pow(10, dB / 10);
    const KdB = -228.6;

    const getElementValue = id => Number(document.getElementById(id).value);
    const getElementType = id => document.getElementById(id).value;

    let digitalModulationTechniqueT = getElementType("digitalModulationTechniqueT");
    let BER = getElementValue("BER");

    const convertValues = (value, type) => {
        if (type === "dB") {
            return { dB: value, watt: dB_to_W(value) };
        } else {
            return { dB: W_to_dB(value), watt: value };
        }
    };

    const getEbN0 = (modulation, ber) => {
        let modulationArray;
        if (modulation === "16PSK") {
            modulationArray = sixteenPSK;
        } else if (modulation === "8PSK") {
            modulationArray = eightPSK;
        } else if (modulation === "BPSK/QPSK") {
            modulationArray = bpskQpsk;
        } else {
            return null;
        }

        for (let i = 0; i < modulationArray.length; i++) {
            if (Math.abs(modulationArray[i].BER - ber) < 0.00001) {
                return modulationArray[i].EbNo;
            }
        }
        return null;
    };

    let EbN0 = getEbN0(digitalModulationTechniqueT, BER);

    let pathloss = getElementValue("pathloss");
    let pathlossT = getElementType("pathloss-dB-watt");
    let otherlosses = getElementValue("otherlosses");
    let otherlossesT = getElementType("otherlosses-dB-watt");
    let fademargin = getElementValue("fademargin");
    let fademarginT = getElementType("fademargin-dB-watt");
    let tranmitAntennaGain = getElementValue("tranmitAntennaGain");
    let tranmitAntennaGainT = getElementType("tranmitAntennaGain-dB-watt");
    let receiveAntennaGain = getElementValue("receiveAntennaGain");
    let receiveAntennaGainT = getElementType("receiveAntennaGain-dB-watt");
    let tranmitAmpliferGain = getElementValue("tranmitAmpliferGain");
    let tranmitAmpliferGainT = getElementType("tranmitAmpliferGain-dB-watt");
    let receiveAmpliferGain = getElementValue("receiveAmpliferGain");
    let receiveAmpliferGainT = getElementType("receiveAmpliferGain-dB-watt");
    let datarate = getElementValue("datarate");
    let datarateT = getElementType("datarate-kbps-dB");
    let noiseTemp = getElementValue("noiseTemp");
    let noiseTempT = getElementType("noiseTemp-kelvin-dB");
    let linkMargin = getElementValue("linkMargin");
    let linkMarginT = getElementType("linkMargin-dB-watt");
    let antennaFeedLineLoss = getElementValue("antennaFeedLineLoss");
    let antennaFeedLineLossT = getElementType("antennaFeedLineLoss-dB-watt");
    let noiseFigureTotal = getElementValue("noiseFigureTotal");
    let noiseFigureTotalT = getElementType("noiseFigureTotal-dB-watt");

    let pathlossConv = convertValues(pathloss, pathlossT);
    let otherlossesConv = convertValues(otherlosses, otherlossesT);
    let fademarginConv = convertValues(fademargin, fademarginT);
    let tranmitAntennaGainConv = convertValues(tranmitAntennaGain, tranmitAntennaGainT);
    let receiveAntennaGainConv = convertValues(receiveAntennaGain, receiveAntennaGainT);
    let tranmitAmpliferGainConv = convertValues(tranmitAmpliferGain, tranmitAmpliferGainT);
    let receiveAmpliferGainConv = convertValues(receiveAmpliferGain, receiveAmpliferGainT);
    let datarateConv = datarate * 1000; // Convert kbps to bps
    datarateConv = convertValues(datarateConv, datarateT);
    let noiseTempConv = convertValues(noiseTemp, noiseTempT);
    let linkMarginConv = convertValues(linkMargin, linkMarginT);
    let antennaFeedLineLossConv = convertValues(antennaFeedLineLoss, antennaFeedLineLossT);
    let noiseFigureTotalConv = convertValues(noiseFigureTotal, noiseFigureTotalT);

    let PowerTransmitdB = linkMarginConv.dB + pathlossConv.dB + antennaFeedLineLossConv.dB + otherlossesConv.dB + fademarginConv.dB + KdB + noiseTempConv.dB +
        noiseFigureTotalConv.dB + datarateConv.dB + EbN0 - (tranmitAntennaGainConv.dB + receiveAntennaGainConv.dB + tranmitAmpliferGainConv.dB + receiveAmpliferGainConv.dB);

    let PowerTransmitWatt = convertValues(PowerTransmitdB, "dB");

    let powerResult = document.getElementById("powerResult");
    powerResult.innerHTML = `<div> Power Transmitted (dB): ${PowerTransmitdB.toFixed(2)}</div>
        <div> Power Transmitted (Watt): ${PowerTransmitWatt.watt.toFixed(2)}</div>`;
};


powerButton.addEventListener("click", powerCalculate);

// Question 4 ---------------------------------------------------------------------------------------------------------------------
let throughputCalculate = () => {
    // event.preventDefault(); // Prevents the default form submission
 
     let bandwidthThroughput = Number(document.getElementById("bandwidthThroughput").value);
 
     let multipleAccessTechniqueType = document.getElementById("multipleAccessTechniqueT").value;
 
     let propagationTime = Number(document.getElementById("propagationTime").value);
     let frameSize = Number(document.getElementById("frameSize").value);
     let frameRate = Number(document.getElementById("frameRate").value);

     if(multipleAccessTechniqueType=="unslottedNonpersistent"){
        let T= (frameSize/bandwidthThroughput)/1000;
        let a= propagationTime/(T*1000000);
        let G= frameRate*1000*T;
        let aT = a*T;
        let aG= a*G;
        let throughput = ((G * Math.pow(Math.E, (-2 * aT))) / ((G * (1 + (2 * a))) + Math.pow(Math.E, (-1 * aG))))*100;
        throughputResult.innerHTML = `<div>Unslotted Nonpersistent Throughput: ${throughput.toFixed(2)}%</div>`;
        
     }else if (multipleAccessTechniqueType=="slottedNonpersistent"){
        let T= (frameSize/bandwidthThroughput)/1000;
        let a= propagationTime/(T*1000000);
        let G= frameRate*1000*T;
        let aT = a*T;
        let aG= a*G;
        let throughput = ((a*G * Math.pow(Math.E, (-2 * aT))) /(1 - Math.pow(Math.E, (-1 * aG))+a))*100;
        throughputResult.innerHTML = `<div>Slotted Nonpersistent Throughput: ${throughput.toFixed(2)}%</div>`;

     }else if(multipleAccessTechniqueType=="unslotted1-persistent"){
        let T = (frameSize / bandwidthThroughput) / 1000;
        let a = propagationTime / (T * 1000000);
        let G = frameRate * 1000 * T;
        let throughputNumerator = G * (1 + G + a * G * (1 + G + (a * G / 2))) * Math.exp(-G * (1 + 2 * a));
        let throughputDenominator = G * (1 + 2 * a) - (1 - Math.exp(-a * G)) + (1 + a * G) * Math.exp(-G * (1 + a));
        let throughput = (throughputNumerator / throughputDenominator) * 100;
        document.getElementById("throughputResult").innerHTML = `<div>Unslotted 1-persistent Throughput: ${throughput.toFixed(2)}%</div>`;
     }else{
        let T = (frameSize / bandwidthThroughput) / 1000;
        let a = propagationTime / (T * 1000000);
        let G = frameRate * 1000 * T;
        let throughputNumerator = G * (1 + a - Math.exp(-a * G)) * Math.exp(-G * (1 + a));
        let throughputDenominator = (1 + a) * (1 - Math.exp(-a * G)) + a * Math.exp(-G * (1 + a));
        let throughput = (throughputNumerator / throughputDenominator) * 100;
        document.getElementById("throughputResult").innerHTML = `<div>Slotted 1-persistent Throughput: ${throughput.toFixed(2)}%</div>`;
     }
};
throughputButton.addEventListener("click", throughputCalculate);




// Question 5 : 
document.getElementById('design-button').addEventListener('click', function() {
    // Get input values
    const area = Number(document.getElementById('area').value);
    const subscribers = Number(document.getElementById('subscribers').value);
    const avgCallsPerDay = Number(document.getElementById('avgCallsPerDay').value);
    const avgCallDuration = Number(document.getElementById('avgCallDuration').value);
    const callDropProb = Number(document.getElementById('callDropProb').value);
    const minSIR = Number(document.getElementById('minSIR').value);
    const refPower = Number(document.getElementById('refPower').value);
    const refDistance = Number(document.getElementById('refDistance').value);
    const pathLossExp = Number(document.getElementById('pathLossExp').value);
    const receiverSensitivity = Number(document.getElementById('receiverSensitivity').value);

    // Convert dB values to linear scale
    const refPowerLinear = Math.pow(10, refPower / 10);
    const receiverSensitivityLinear = receiverSensitivity * Math.pow(10, -6); // Convert µW to W

    // Calculate maximum distance
    const maxDistance = refDistance * Math.pow(refPowerLinear / receiverSensitivityLinear, 1 / pathLossExp);

    // Display result
    document.getElementById('designResult').innerHTML = `
        <p>Maximum distance between transmitter and receiver for reliable communication: ${maxDistance.toFixed(2)} meters</p>
    `;
});






