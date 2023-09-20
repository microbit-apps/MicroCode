namespace microcode {
    const STM8_ADDRESSS = 0x10

    //https://github.com/elecfreaks/pxt-cutebot/blob/master/cutebot.ts
    function motors(lspeed: number, rspeed: number): void {
        let buf = pins.createBuffer(4);
        if (lspeed > 100) {
            lspeed = 100;
        } else if (lspeed < -100) {
            lspeed = -100;
        }
        if (rspeed > 100) {
            rspeed = 100;
        } else if (rspeed < -100) {
            rspeed = -100;
        }
        if (lspeed > 0) {
            buf[0] = 0x01;    //左右轮 0x01左轮  0x02右轮
            buf[1] = 0x02;		//正反转0x02前进  0x01后退
            buf[2] = lspeed;	//速度
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }
        else {
            buf[0] = 0x01;
            buf[1] = 0x01;
            buf[2] = lspeed * -1;
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }
        if (rspeed > 0) {
            buf[0] = 0x02;
            buf[1] = 0x02;
            buf[2] = rspeed;
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }
        else {
            buf[0] = 0x02;
            buf[1] = 0x01;
            buf[2] = rspeed * -1;
            buf[3] = 0;			//补位
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);  //写入左轮
        }

    }

    export function singleheadlights(r: number, g: number, b: number): void {
        let buf = pins.createBuffer(4);
            buf[0] = 0x04;
            buf[1] = r;
            buf[2] = g;
            buf[3] = b;
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);
            buf[0] = 0x08;
            pins.i2cWriteBuffer(STM8_ADDRESSS, buf);
    }

    export class ElecfreaksCutebotRobot extends Robot {
        constructor() {
            super()
            this.musicVolume = 168;
            this.maxRunSpeed = 50;
            this.maxTurnSpeed = 50;
        }

        motorRun(speed: number) {
            motors(speed, speed)
        }

        motorTurn(speed: number) {
            if (speed > 0)
                motors(0, speed)
            else
                motors(-speed, 0)
        }

        headlightsSetColor(red: number, green: number, blue: number) {
            singleheadlights(red, green, blue)
        }
    }
}