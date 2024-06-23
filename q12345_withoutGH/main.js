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
    const trafficData = [
        { N: 1, '0.1%': 0.001, '0.2%': 0.002, '0.5%': 0.005, '1%': 0.010, '1.2%': 0.012, '1.3%': 0.013, '1.5%': 0.02, '2%': 0.020, '3%': 0.031, '5%': 0.053, '7%': 0.075, '10%': 0.111, '15%': 0.176, '20%': 0.250, '30%': 0.429, '40%': 0.667, '50%': 1.00 },
        { N: 2, '0.1%': 0.046, '0.2%': 0.065, '0.5%': 0.105, '1%': 0.153, '1.2%': 0.168, '1.3%': 0.176, '1.5%': 0.19, '2%': 0.223, '3%': 0.282, '5%': 0.381, '7%': 0.470, '10%': 0.595, '15%': 0.796, '20%': 1.00, '30%': 1.45, '40%': 2.00, '50%': 2.73 },
        { N: 3, '0.1%': 0.194, '0.2%': 0.249, '0.5%': 0.349, '1%': 0.455, '1.2%': 0.489, '1.3%': 0.505, '1.5%': 0.53, '2%': 0.602, '3%': 0.715, '5%': 0.899, '7%': 1.06, '10%': 1.27, '15%': 1.60, '20%': 1.93, '30%': 2.63, '40%': 3.48, '50%': 4.59 },
        { N: 4, '0.1%': 0.439, '0.2%': 0.535, '0.5%': 0.701, '1%': 0.869, '1.2%': 0.922, '1.3%': 0.946, '1.5%': 0.99, '2%': 1.09, '3%': 1.26, '5%': 1.52, '7%': 1.75, '10%': 2.05, '15%': 2.50, '20%': 2.95, '30%': 3.89, '40%': 5.02, '50%': 6.50 },
        { N: 5, '0.1%': 0.762, '0.2%': 0.900, '0.5%': 1.13, '1%': 1.36, '1.2%': 1.43, '1.3%': 1.46, '1.5%': 1.52, '2%': 1.66, '3%': 1.88, '5%': 2.22, '7%': 2.50, '10%': 2.88, '15%': 3.45, '20%': 4.01, '30%': 5.19, '40%': 6.60, '50%': 8.44 },
        { N: 6, '0.1%': 1.15, '0.2%': 1.33, '0.5%': 1.62, '1%': 1.91, '1.2%': 2.00, '1.3%': 2.04, '1.5%': 2.11, '2%': 2.28, '3%': 2.54, '5%': 2.96, '7%': 3.30, '10%': 3.76, '15%': 4.44, '20%': 5.11, '30%': 6.51, '40%': 8.19, '50%': 10.4 },
        { N: 7, '0.1%': 1.58, '0.2%': 1.80, '0.5%': 2.16, '1%': 2.50, '1.2%': 2.60, '1.3%': 2.65, '1.5%': 2.73, '2%': 2.94, '3%': 3.25, '5%': 3.74, '7%': 4.14, '10%': 4.67, '15%': 5.46, '20%': 6.23, '30%': 7.86, '40%': 9.80, '50%': 12.4 },
        { N: 8, '0.1%': 2.05, '0.2%': 2.31, '0.5%': 2.73, '1%': 3.13, '1.2%': 3.25, '1.3%': 3.30, '1.5%': 3.40, '2%': 3.63, '3%': 3.99, '5%': 4.54, '7%': 5.00, '10%': 5.60, '15%': 6.50, '20%': 7.37, '30%': 9.21, '40%': 11.4, '50%': 14.3 },
        { N: 9, '0.1%': 2.56, '0.2%': 2.85, '0.5%': 3.33, '1%': 3.78, '1.2%': 3.92, '1.3%': 3.98, '1.5%': 4.08, '2%': 4.34, '3%': 4.75, '5%': 5.37, '7%': 5.88, '10%': 6.55, '15%': 7.55, '20%': 8.52, '30%': 10.6, '40%': 13.0, '50%': 16.3 },
        { N: 10, '0.1%': 3.09, '0.2%': 3.43, '0.5%': 3.96, '1%': 4.46, '1.2%': 4.61, '1.3%': 4.68, '1.5%': 4.80, '2%': 5.08, '3%': 5.53, '5%': 6.22, '7%': 6.78, '10%': 7.51, '15%': 8.62, '20%': 9.68, '30%': 12.0, '40%': 14.7, '50%': 18.3 },
        { N: 11, '0.1%': 3.65, '0.2%': 4.02, '0.5%': 4.61, '1%': 5.16, '1.2%': 5.32, '1.3%': 5.40, '1.5%': 5.53, '2%': 5.84, '3%': 6.33, '5%': 7.08, '7%': 7.69, '10%': 8.49, '15%': 9.69, '20%': 10.9, '30%': 13.3, '40%': 16.3, '50%': 20.3 },
        { N: 12, '0.1%': 4.23, '0.2%': 4.64, '0.5%': 5.28, '1%': 5.88, '1.2%': 6.05, '1.3%': 6.14, '1.5%': 6.27, '2%': 6.61, '3%': 7.14, '5%': 7.95, '7%': 8.61, '10%': 9.47, '15%': 10.8, '20%': 12.0, '30%': 14.7, '40%': 18.0, '50%': 22.2 },
        { N: 13, '0.1%': 4.83, '0.2%': 5.27, '0.5%': 5.96, '1%': 6.61, '1.2%': 6.80, '1.3%': 6.89, '1.5%': 7.03, '2%': 7.40, '3%': 7.97, '5%': 8.83, '7%': 9.54, '10%': 10.5, '15%': 11.9, '20%': 13.2, '30%': 16.1, '40%': 19.6, '50%': 24.2 },
        { N: 14, '0.1%': 5.45, '0.2%': 5.92, '0.5%': 6.66, '1%': 7.35, '1.2%': 7.56, '1.3%': 7.65, '1.5%': 7.81, '2%': 8.20, '3%': 8.80, '5%': 9.73, '7%': 10.5, '10%': 11.5, '15%': 13.0, '20%': 14.4, '30%': 17.5, '40%': 21.2, '50%': 26.2 },
        { N: 15, '0.1%': 6.08, '0.2%': 6.58, '0.5%': 7.38, '1%': 8.11, '1.2%': 8.33, '1.3%': 8.43, '1.5%': 8.59, '2%': 9.01, '3%': 9.65, '5%': 10.6, '7%': 11.4, '10%': 12.5, '15%': 14.1, '20%': 15.6, '30%': 18.9, '40%': 22.9, '50%': 28.2 },
        { N: 16, '0.1%': 6.72, '0.2%': 7.26, '0.5%': 8.10, '1%': 8.88, '1.2%': 9.11, '1.3%': 9.21, '1.5%': 9.39, '2%': 9.83, '3%': 10.5, '5%': 11.5, '7%': 12.4, '10%': 13.5, '15%': 15.2, '20%': 16.8, '30%': 20.3, '40%': 24.5, '50%': 30.2 },
        { N: 17, '0.1%': 7.38, '0.2%': 7.95, '0.5%': 8.83, '1%': 9.65, '1.2%': 9.89, '1.3%': 10.0, '1.5%': 10.19, '2%': 10.7, '3%': 11.4, '5%': 12.5, '7%': 13.4, '10%': 14.5, '15%': 16.3, '20%': 18.0, '30%': 21.7, '40%': 26.2, '50%': 32.2 },
        { N: 18, '0.1%': 8.05, '0.2%': 8.64, '0.5%': 9.58, '1%': 10.4, '1.2%': 10.7, '1.3%': 10.8, '1.5%': 11.00, '2%': 11.5, '3%': 12.2, '5%': 13.4, '7%': 14.3, '10%': 15.5, '15%': 17.4, '20%': 19.2, '30%': 23.1, '40%': 27.8, '50%': 34.2 },
        { N: 19, '0.1%': 8.72, '0.2%': 9.35, '0.5%': 10.3, '1%': 11.2, '1.2%': 11.5, '1.3%': 11.6, '1.5%': 11.82, '2%': 12.3, '3%': 13.1, '5%': 14.3, '7%': 15.3, '10%': 16.6, '15%': 18.5, '20%': 20.4, '30%': 24.5, '40%': 29.5, '50%': 36.2 },
        { N: 20, '0.1%': 9.41, '0.2%': 10.1, '0.5%': 11.1, '1%': 12.0, '1.2%': 12.3, '1.3%': 12.4, '1.5%': 12.65, '2%': 13.2, '3%': 14.0, '5%': 15.2, '7%': 16.3, '10%': 17.6, '15%': 19.6, '20%': 21.6, '30%': 25.9, '40%': 31.2, '50%': 38.2 },
        { N: 21, '0.1%': 10.1, '0.2%': 10.8, '0.5%': 11.9, '1%': 12.8, '1.2%': 13.1, '1.3%': 13.3, '1.5%': 13.48, '2%': 14.0, '3%': 14.9, '5%': 16.2, '7%': 17.3, '10%': 18.7, '15%': 20.8, '20%': 22.8, '30%': 27.3, '40%': 32.8, '50%': 40.2 },
        { N: 22, '0.1%': 10.8, '0.2%': 11.5, '0.5%': 12.6, '1%': 13.7, '1.2%': 14.0, '1.3%': 14.1, '1.5%': 14.32, '2%': 14.9, '3%': 15.8, '5%': 17.1, '7%': 18.2, '10%': 19.7, '15%': 21.9, '20%': 24.1, '30%': 28.7, '40%': 34.5, '50%': 42.1 },
        { N: 23, '0.1%': 11.5, '0.2%': 12.3, '0.5%': 13.4, '1%': 14.5, '1.2%': 14.8, '1.3%': 14.9, '1.5%': 15.16, '2%': 15.8, '3%': 16.7, '5%': 18.1, '7%': 19.2, '10%': 20.7, '15%': 23.0, '20%': 25.3, '30%': 30.1, '40%': 36.1, '50%': 44.1 },
        { N: 24, '0.1%': 12.2, '0.2%': 13.0, '0.5%': 14.2, '1%': 15.3, '1.2%': 15.6, '1.3%': 15.8, '1.5%': 16.01, '2%': 16.6, '3%': 17.6, '5%': 19.0, '7%': 20.2, '10%': 21.8, '15%': 24.2, '20%': 26.5, '30%': 31.6, '40%': 37.8, '50%': 46.1 },
        { N: 25, '0.1%': 13.0, '0.2%': 13.8, '0.5%': 15.0, '1%': 16.1, '1.2%': 16.5, '1.3%': 16.6, '1.5%': 16.87, '2%': 17.5, '3%': 18.5, '5%': 20.0, '7%': 21.2, '10%': 22.8, '15%': 25.3, '20%': 27.7, '30%': 33.0, '40%': 39.4, '50%': 48.1 },
        
    ];
    
    function getN(probability, value) {
        // Remove '%' symbol and convert probability to string
        let probStr = probability.toString() + '%';
    
        // Search for the value in trafficData array
        for (let i = 0; i < trafficData.length; i++) {
            if (trafficData[i][probStr] >= value) {
                return trafficData[i].N;
            }
        }
    
        return null; // Return null if not found
    }
    
    
    
    
    // Get input values
    const area = Number(document.getElementById('area').value) * 1000000; // Convert Km^2 to m^2
    const subscribers = Number(document.getElementById('subscribers').value);
    const avgCallsPerDay = Number(document.getElementById('avgCallsPerDay').value);
    const avgCallDuration = Number(document.getElementById('avgCallDuration').value);
    const callDropProb = Number(document.getElementById('callDropProb').value);
    const minSIR = Number(document.getElementById('minSIR').value);
    const refPower = Number(document.getElementById('refPower').value);
    const refDistance = Number(document.getElementById('refDistance').value);
    const pathLossExp = Number(document.getElementById('pathLossExp').value);
    const receiverSensitivity = Number(document.getElementById('receiverSensitivity').value);
    let channenlsNum = Number(document.getElementById('timeslotsPerCarrier').value);

    // Convert dB values to linear scale
    const refPowerLinear = Math.pow(10, refPower / 10);
    const receiverSensitivityLinear = receiverSensitivity * Math.pow(10, -6); // Convert µW to W

    // Calculate maximum distance
    const maxDistance = refDistance * Math.pow(refPowerLinear / receiverSensitivityLinear, 1 / pathLossExp);

    // Calculate maximum cell size
    const maxCellSize = ((3 * Math.sqrt(3)) / 2) * Math.pow(maxDistance, 2);

    // Calculate number of cells in the service area
    const numberOfCells = area / maxCellSize;

    // Calculate traffic load in the whole cellular system in Erlangs
    const lambda = avgCallsPerDay / 86400; // Convert calls/day to calls/second
    const H = avgCallDuration * 60; // Convert minutes/call to seconds/call
    const trafficLoad = subscribers * lambda * H;

    // Calculate traffic load in each cell in Erlangs
    const trafficLoadPerCell = trafficLoad / numberOfCells;

    // Calculate the number of cells in each cluster
    const minSIRLinear = Math.pow(10, minSIR / 10); // Convert SIR from dB to linear scale
    const Nb = 6;
    //const N = Math.ceil(Math.pow(minSIRLinear * Nb, 1 / pathLossExp) / 3);
    let jazerN = Math.pow(minSIRLinear*Nb, 2/pathLossExp);
    let N = Math.ceil(jazerN/3);

    let Num = Math.ceil((getN(callDropProb*100, trafficLoadPerCell))/channenlsNum);
    

    // Display results
    document.getElementById('designResult').innerHTML = `
        <p>Maximum distance between transmitter and receiver for reliable communication: ${maxDistance.toFixed(2)} meters</p>
        <p>Maximum cell size assuming hexagonal cells: ${maxCellSize.toFixed(2)} square meters</p>
        <p>Number of cells in the service area: ${numberOfCells.toFixed(2)}</p>
        <p>Traffic load in the whole cellular system: ${trafficLoad.toFixed(3)} Erlangs</p>
        <p>Traffic load in each cell: ${trafficLoadPerCell.toFixed(3)} Erlangs</p>
        <p>Number of cells in each cluster: ${N}</p>
        <p>Minimum number of carriers needed to achieve the required Quality of Service: ${Num} Carriers</p>
    `;
});



